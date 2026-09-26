import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import {
  Landmark,
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Edit3,
  Trash2,
  Plus,
  Loader2,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  Check,
  RefreshCw,
  QrCode,
  UploadCloud,
  FileImage,
  X,
  FileText,
  Maximize2,
} from 'lucide-react';
import { useUserQuery, useUpdateUserMutation } from '@/api/hooks/user.hooks';

export interface BankAccountDetails {
  id: string;
  userId?: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'SAVINGS' | 'CURRENT';
  upiId?: string;
  documentImage?: string; // Auto-compressed passbook / cheque image (<100KB)
  documentImageSizeKB?: number;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const POPULAR_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
];

/**
 * Compresses any image file of any size (MBs) to strictly <= 100 KB using Canvas API
 */
const compressImageTo100KB = (
  file: File,
  onProgress?: (msg: string) => void
): Promise<{ base64: string; sizeKB: number; originalSizeKB: number }> => {
  return new Promise((resolve, reject) => {
    const originalSizeKB = Math.round(file.size / 1024);
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file (JPG, PNG, WEBP).'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        try {
          const TARGET_BYTES = 100 * 1024; // 100 KB limit
          let width = img.width;
          let height = img.height;

          // Scale down dimensions if huge
          const MAX_INITIAL_DIM = 1200;
          if (width > MAX_INITIAL_DIM || height > MAX_INITIAL_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_INITIAL_DIM) / width);
              width = MAX_INITIAL_DIM;
            } else {
              width = Math.round((width * MAX_INITIAL_DIM) / height);
              height = MAX_INITIAL_DIM;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return reject(new Error('Could not initialize image processing context.'));
          }

          // Fill white background for transparent PNGs
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          const getBase64Bytes = (dataUrl: string) => {
            const base64Str = dataUrl.split(',')[1] || '';
            return Math.round((base64Str.length * 3) / 4);
          };

          // Binary search for ideal compression quality
          let minQuality = 0.05;
          let maxQuality = 0.92;
          let bestResult = canvas.toDataURL('image/jpeg', 0.8);
          let currentSize = getBase64Bytes(bestResult);

          for (let i = 0; i < 7; i++) {
            const currentQuality = (minQuality + maxQuality) / 2;
            const currentDataUrl = canvas.toDataURL('image/jpeg', currentQuality);
            currentSize = getBase64Bytes(currentDataUrl);

            bestResult = currentDataUrl;
            if (currentSize <= TARGET_BYTES) {
              minQuality = currentQuality; // Try higher quality
            } else {
              maxQuality = currentQuality; // Needs more compression
            }
          }

          // If still over 100KB due to complex image content, scale canvas down progressively
          let finalBytes = getBase64Bytes(bestResult);
          let scaleFactor = 0.8;

          while (finalBytes > TARGET_BYTES && scaleFactor >= 0.15) {
            const scaledCanvas = document.createElement('canvas');
            scaledCanvas.width = Math.max(200, Math.round(width * scaleFactor));
            scaledCanvas.height = Math.max(200, Math.round(height * scaleFactor));

            const scaledCtx = scaledCanvas.getContext('2d');
            if (scaledCtx) {
              scaledCtx.fillStyle = '#FFFFFF';
              scaledCtx.fillRect(0, 0, scaledCanvas.width, scaledCanvas.height);
              scaledCtx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

              bestResult = scaledCanvas.toDataURL('image/jpeg', 0.65);
              finalBytes = getBase64Bytes(bestResult);
            }
            scaleFactor -= 0.15;
          }

          const finalSizeKB = Math.round(finalBytes / 1024);
          resolve({
            base64: bestResult,
            sizeKB: finalSizeKB,
            originalSizeKB,
          });
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = () => reject(new Error('Failed to decode image.'));
    };

    reader.onerror = () => reject(new Error('Failed to read file.'));
  });
};

export default function BankDetailsPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authentication & user retrieval
  const localUser = useMemo(() => {
    try {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch {
      return null;
    }
  }, []);

  const userId = localUser?.id || '';
  const { data: userProfileData } = useUserQuery(userId, !!userId);
  const user = userProfileData?.data || localUser;
  const updateUserMutation = useUpdateUserMutation();

  const storageKey = useMemo(() => {
    return userId ? `user_bank_details_${userId}` : 'user_bank_details';
  }, [userId]);

  // States
  const [savedBank, setSavedBank] = useState<BankAccountDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);

  // Form Fields
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountType, setAccountType] = useState<'SAVINGS' | 'CURRENT'>('SAVINGS');
  const [upiId, setUpiId] = useState('');
  const [isDefault, setIsDefault] = useState(true);

  // Document Image Upload & Compression States
  const [documentImage, setDocumentImage] = useState<string>('');
  const [documentSizeKB, setDocumentSizeKB] = useState<number>(0);
  const [originalFileSizeKB, setOriginalFileSizeKB] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check login
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('user_token')) {
      navigate('/login');
    }
  }, [navigate]);

  // Load existing saved bank details from storage or user database profile
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: BankAccountDetails = JSON.parse(saved);
        setSavedBank(parsed);
        setAccountHolderName(parsed.accountHolderName || '');
        setBankName(parsed.bankName || '');
        setAccountNumber(parsed.accountNumber || '');
        setConfirmAccountNumber(parsed.accountNumber || '');
        setIfscCode(parsed.ifscCode || '');
        setAccountType(parsed.accountType || 'SAVINGS');
        setUpiId(parsed.upiId || '');
        setDocumentImage(parsed.documentImage || '');
        setDocumentSizeKB(parsed.documentImageSizeKB || 0);
        setIsDefault(parsed.isDefault ?? true);
        setIsEditing(false);
      } else if (user?.bankName || user?.accountNumber || user?.ifscCode || user?.accountHolderName) {
        const dbHolderName = user.accountHolderName || `${user.firstName || ''} ${user.lastName || ''}`.trim();
        const bankData: BankAccountDetails = {
          id: `bank_${userId}`,
          userId,
          accountHolderName: dbHolderName,
          bankName: user.bankName || '',
          accountNumber: user.accountNumber || '',
          ifscCode: user.ifscCode || '',
          accountType: 'SAVINGS',
          upiId: user.upiId || undefined,
          isDefault: true,
          createdAt: (user as any).createdAt || new Date().toISOString(),
          updatedAt: (user as any).updatedAt || new Date().toISOString(),
        };
        setSavedBank(bankData);
        setAccountHolderName(bankData.accountHolderName);
        setBankName(bankData.bankName);
        setAccountNumber(bankData.accountNumber);
        setConfirmAccountNumber(bankData.accountNumber);
        setIfscCode(bankData.ifscCode);
        setUpiId(bankData.upiId || '');
        setIsEditing(false);
      } else {
        // Pre-fill holder name from user profile
        if (user) {
          const defaultName = user.accountHolderName || `${user.firstName || ''} ${user.lastName || ''}`.trim();
          if (defaultName) setAccountHolderName(defaultName);
        }
        setIsEditing(true);
      }
    } catch {
      setIsEditing(true);
    }
  }, [storageKey, user, userId]);

  // Handle Image Selection and Auto-Compression to <= 100KB
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const result = await compressImageTo100KB(file);
      setDocumentImage(result.base64);
      setDocumentSizeKB(result.sizeKB);
      setOriginalFileSizeKB(result.originalSizeKB);

      toast.success(
        `Image auto-compressed from ${result.originalSizeKB} KB to ${result.sizeKB} KB (Under 100 KB)`
      );
    } catch (err: any) {
      toast.error(err.message || 'Failed to compress and upload image.');
    } finally {
      setIsCompressing(false);
      // Reset input value so re-selecting same file triggers onChange
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setDocumentImage('');
    setDocumentSizeKB(0);
    setOriginalFileSizeKB(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validate fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    } else if (accountHolderName.trim().length < 3) {
      newErrors.accountHolderName = 'Name must be at least 3 characters';
    }

    if (!bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(accountNumber.trim())) {
      newErrors.accountNumber = 'Account number must be 9-18 numeric digits';
    }

    if (!confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = 'Please confirm your account number';
    } else if (accountNumber.trim() !== confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }

    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const cleanIfsc = ifscCode.trim().toUpperCase();
    if (!cleanIfsc) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!ifscRegex.test(cleanIfsc)) {
      newErrors.ifscCode = 'Invalid IFSC format (e.g. SBIN0001234)';
    }

    if (upiId.trim() && !/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
      newErrors.upiId = 'Invalid UPI ID format (e.g. name@okhdfcbank)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form before submitting');
      return;
    }

    setIsSaving(true);
    try {
      const bankData: BankAccountDetails = {
        id: savedBank?.id || `bank_${Date.now()}`,
        userId,
        accountHolderName: accountHolderName.trim(),
        bankName: bankName.trim(),
        accountNumber: accountNumber.trim(),
        ifscCode: ifscCode.trim().toUpperCase(),
        accountType,
        upiId: upiId.trim() || undefined,
        documentImage: documentImage || undefined,
        documentImageSizeKB: documentSizeKB || undefined,
        isDefault,
        createdAt: savedBank?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (userId) {
        await updateUserMutation.mutateAsync({
          id: userId,
          data: {
            accountHolderName: bankData.accountHolderName,
            bankName: bankData.bankName,
            accountNumber: bankData.accountNumber,
            ifscCode: bankData.ifscCode,
            upiId: bankData.upiId || null,
          },
        });
      }

      localStorage.setItem(storageKey, JSON.stringify(bankData));
      localStorage.setItem('user_bank_details', JSON.stringify(bankData));

      setSavedBank(bankData);
      setIsEditing(false);
      toast.success('Bank account details saved successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save bank details');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to remove your saved bank account?')) {
      try {
        if (userId) {
          await updateUserMutation.mutateAsync({
            id: userId,
            data: {
              accountHolderName: null,
              bankName: null,
              accountNumber: null,
              ifscCode: null,
              upiId: null,
            },
          });
        }
      } catch (err) {
        console.error('Failed to clear bank details from database:', err);
      }
      localStorage.removeItem(storageKey);
      localStorage.removeItem('user_bank_details');
      setSavedBank(null);
      setAccountNumber('');
      setConfirmAccountNumber('');
      setIfscCode('');
      setBankName('');
      setUpiId('');
      setDocumentImage('');
      setDocumentSizeKB(0);
      setIsEditing(true);
      toast.success('Bank details removed successfully');
    }
  };

  const maskedAccountNumber = useMemo(() => {
    if (!savedBank?.accountNumber) return '';
    const acc = savedBank.accountNumber;
    if (acc.length <= 4) return acc;
    const visible = acc.slice(-4);
    const masked = '•'.repeat(acc.length - 4);
    return `${masked.replace(/(.{4})/g, '$1 ')} ${visible}`.trim();
  }, [savedBank]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F7F8FA] text-black">

        {/* ── Top Header / Breadcrumb ──────────────────────── */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-3">
              <Link to="/account" className="hover:text-black transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Account
              </Link>
              <span>/</span>
              <span className="text-black font-bold">Bank Account</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                    Bank Account Details
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Manage your banking details for seamless refunds, exchange settlements, and buyback payouts.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full self-start sm:self-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-bold text-emerald-700 tracking-wide">
                  256-Bit SSL Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content Area ───────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* 1. Saved Bank Card View (if exists and not in editing mode) */}
          {savedBank && !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Luxury Digital Bank Card */}
              <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white shadow-xl bg-gradient-to-br from-[#1C1A27] via-[#2A2438] to-[#12111A] border border-white/10">
                {/* Decorative Gold & Shimmer Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between min-h-[200px] gap-6">
                  {/* Card Top Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <Landmark className="w-5 h-5 text-[#E5D5B5]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                          Primary Refund Account
                        </p>
                        <h2 className="text-lg sm:text-xl font-bold tracking-wide text-white">
                          {savedBank.bankName}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {savedBank.documentImage && (
                        <button
                          type="button"
                          onClick={() => setPreviewModalImage(savedBank.documentImage!)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-[10px] font-bold uppercase tracking-wider transition-colors"
                        >
                          <FileImage className="w-3.5 h-3.5" />
                          Proof Attached
                        </button>
                      )}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </div>
                    </div>
                  </div>

                  {/* Card Account Number */}
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Account Number</p>
                    <div className="flex items-center gap-3">
                      <p className="text-xl sm:text-2xl font-mono tracking-widest text-white">
                        {showAccountNumber ? savedBank.accountNumber : maskedAccountNumber}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowAccountNumber(!showAccountNumber)}
                        className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                        title={showAccountNumber ? 'Hide Account Number' : 'Show Account Number'}
                      >
                        {showAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Card Bottom Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Account Holder</p>
                      <p className="font-bold text-white uppercase tracking-wide truncate">
                        {savedBank.accountHolderName}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">IFSC Code</p>
                      <p className="font-mono font-bold text-[#E5D5B5] uppercase tracking-wider">
                        {savedBank.ifscCode}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Account Type</p>
                      <p className="font-bold text-white uppercase tracking-wide">
                        {savedBank.accountType}
                      </p>
                    </div>

                    {savedBank.upiId && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">UPI VPA</p>
                        <p className="font-bold text-emerald-300 truncate">
                          {savedBank.upiId}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Bank Details
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Account
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. Bank Details Form (When editing or adding new) */}
          {(isEditing || !savedBank) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Form Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-black">
                    {savedBank ? 'Edit Bank Account Details' : 'Enter Bank Account Details'}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Please ensure the details match your official bank passbook or cheque book.
                  </p>
                </div>

                {savedBank && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-xs font-semibold text-gray-500 hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Quick Select Popular Banks */}
              <div className="p-6 bg-gray-50/60 border-b border-gray-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Quick Select Popular Bank:
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_BANKS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setBankName(b);
                        if (errors.bankName) {
                          setErrors((prev) => ({ ...prev, bankName: '' }));
                        }
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        bankName === b
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* 1. Account Holder Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-gray-400" />
                      Account Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={accountHolderName}
                      onChange={(e) => {
                        setAccountHolderName(e.target.value);
                        if (errors.accountHolderName) setErrors((prev) => ({ ...prev, accountHolderName: '' }));
                      }}
                      placeholder="e.g. AMIT DAS"
                      className={`w-full px-4 py-2.5 text-sm bg-[#F7F8FA] border rounded-xl text-black placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.accountHolderName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-black'
                      }`}
                    />
                    {errors.accountHolderName && (
                      <p className="text-xs text-red-500 font-medium">{errors.accountHolderName}</p>
                    )}
                  </div>

                  {/* 2. Bank Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => {
                        setBankName(e.target.value);
                        if (errors.bankName) setErrors((prev) => ({ ...prev, bankName: '' }));
                      }}
                      placeholder="e.g. State Bank of India / HDFC Bank"
                      className={`w-full px-4 py-2.5 text-sm bg-[#F7F8FA] border rounded-xl text-black placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.bankName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-black'
                      }`}
                    />
                    {errors.bankName && (
                      <p className="text-xs text-red-500 font-medium">{errors.bankName}</p>
                    )}
                  </div>

                  {/* 3. Account Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setAccountNumber(val);
                        if (errors.accountNumber) setErrors((prev) => ({ ...prev, accountNumber: '' }));
                      }}
                      placeholder="Enter 9-18 digit account number"
                      maxLength={18}
                      className={`w-full px-4 py-2.5 text-sm font-mono bg-[#F7F8FA] border rounded-xl text-black placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.accountNumber
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-black'
                      }`}
                    />
                    {errors.accountNumber && (
                      <p className="text-xs text-red-500 font-medium">{errors.accountNumber}</p>
                    )}
                  </div>

                  {/* 4. Confirm Account Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-gray-400" />
                      Confirm Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={confirmAccountNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setConfirmAccountNumber(val);
                        if (errors.confirmAccountNumber) setErrors((prev) => ({ ...prev, confirmAccountNumber: '' }));
                      }}
                      placeholder="Re-enter account number"
                      maxLength={18}
                      className={`w-full px-4 py-2.5 text-sm font-mono bg-[#F7F8FA] border rounded-xl text-black placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.confirmAccountNumber
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-black'
                      }`}
                    />
                    {errors.confirmAccountNumber && (
                      <p className="text-xs text-red-500 font-medium">{errors.confirmAccountNumber}</p>
                    )}
                  </div>

                  {/* 5. IFSC Code */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-gray-400" />
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setIfscCode(val);
                        if (errors.ifscCode) setErrors((prev) => ({ ...prev, ifscCode: '' }));
                      }}
                      placeholder="e.g. SBIN0001234"
                      maxLength={11}
                      className={`w-full px-4 py-2.5 text-sm font-mono uppercase bg-[#F7F8FA] border rounded-xl text-black placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.ifscCode
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-black'
                      }`}
                    />
                    {errors.ifscCode && (
                      <p className="text-xs text-red-500 font-medium">{errors.ifscCode}</p>
                    )}
                  </div>

                  {/* 6. Account Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                      Account Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAccountType('SAVINGS')}
                        className={`py-2.5 px-4 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          accountType === 'SAVINGS'
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-[#F7F8FA] text-gray-700 border-gray-200 hover:bg-white'
                        }`}
                      >
                        Savings Account
                      </button>

                      <button
                        type="button"
                        onClick={() => setAccountType('CURRENT')}
                        className={`py-2.5 px-4 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          accountType === 'CURRENT'
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-[#F7F8FA] text-gray-700 border-gray-200 hover:bg-white'
                        }`}
                      >
                        Current Account
                      </button>
                    </div>
                  </div>

                  {/* 7. UPI ID (Optional) */}
                  <div className="space-y-1.5 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                        <QrCode className="w-3.5 h-3.5 text-gray-400" />
                        UPI ID / VPA <span className="text-[10px] font-normal text-gray-400 lowercase">(optional for instant UPI payouts)</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value.toLowerCase());
                        if (errors.upiId) setErrors((prev) => ({ ...prev, upiId: '' }));
                      }}
                      placeholder="e.g. mobile@okhdfcbank or name@paytm"
                      className={`w-full px-4 py-2.5 text-sm bg-[#F7F8FA] border rounded-xl text-black placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.upiId
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-black'
                      }`}
                    />
                    {errors.upiId && (
                      <p className="text-xs text-red-500 font-medium">{errors.upiId}</p>
                    )}
                  </div>

                  {/* 8. Bank Proof Image Upload with <= 100KB Auto-Compression */}
                  <div className="space-y-2 md:col-span-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <FileImage className="w-3.5 h-3.5 text-indigo-600" />
                        Passbook / Cancelled Cheque Photo{' '}
                        <span className="text-[10px] font-normal text-gray-400 lowercase">(optional for fast-track verification)</span>
                      </label>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        ⚡ Auto-compressed under 100 KB
                      </span>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="bank-proof-upload"
                    />

                    {isCompressing ? (
                      <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
                        <p className="text-xs font-bold text-indigo-900">
                          Compressing & optimizing image under 100 KB...
                        </p>
                        <p className="text-[11px] text-indigo-500">
                          Please wait while your document is formatted for secure storage.
                        </p>
                      </div>
                    ) : documentImage ? (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#F7F8FA] border border-gray-200 rounded-2xl">
                        <div className="flex items-center gap-3.5">
                          <div
                            onClick={() => setPreviewModalImage(documentImage)}
                            className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-300 bg-white cursor-pointer group flex-shrink-0"
                            title="Click to view full image"
                          >
                            <img
                              src={documentImage}
                              alt="Bank Proof"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Maximize2 className="w-4 h-4" />
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-bold text-black flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Bank Proof Uploaded
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                                Size: {documentSizeKB} KB (Under 100KB)
                              </span>
                              {originalFileSizeKB > 0 && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  {originalFileSizeKB} KB
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => setPreviewModalImage(documentImage)}
                            className="px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-black bg-white border border-gray-200 rounded-lg hover:border-gray-400 transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <label
                            htmlFor="bank-proof-upload"
                            className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Replace
                          </label>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                            title="Remove Document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="bank-proof-upload"
                        className="border-2 border-dashed border-gray-200 hover:border-black/50 bg-[#F7F8FA] hover:bg-white rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group"
                      >
                        <div className="w-11 h-11 rounded-full bg-indigo-50 group-hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-black">
                            Click to upload Passbook / Cancelled Cheque image
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Supports JPG, PNG, WEBP — Any file size will be automatically compressed under 100 KB.
                          </p>
                        </div>
                      </label>
                    )}
                  </div>

                </div>

                {/* Set as Primary Checkbox */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black"
                    />
                    <span className="text-xs font-semibold text-gray-700">
                      Set as primary destination for all refunds and return settlements
                    </span>
                  </label>
                </div>

                {/* Form Buttons */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSaving || isCompressing}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {savedBank ? 'Update Bank Details' : 'Save Bank Details'}
                  </button>

                  {savedBank && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}

          {/* 3. Security Guarantee & Refund FAQs Callout */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-black">
                  Security & Data Privacy Guarantee
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your banking information is protected with industry-standard 256-bit encryption. Sakhio Fine Jewellery never stores your sensitive CVV/ATM PINs. This bank account is strictly used to credit approved refunds, exchange differentials, and jewellery buyback settlements directly to you.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant IMPS / NEFT Credit</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero Transfer Deduction</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Verified by NPCI Guidelines</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Document Full Preview Lightbox Modal ─────────── */}
        <AnimatePresence>
          {previewModalImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setPreviewModalImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col items-center gap-4"
              >
                <div className="w-full flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                    <FileImage className="w-4 h-4 text-indigo-600" />
                    Bank Document Proof
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewModalImage(null)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-full max-h-[70vh] overflow-auto flex items-center justify-center bg-gray-50 rounded-xl p-2 border border-gray-100">
                  <img
                    src={previewModalImage}
                    alt="Bank Document Proof"
                    className="max-w-full max-h-[65vh] object-contain rounded-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </MainLayout>
  );
}
