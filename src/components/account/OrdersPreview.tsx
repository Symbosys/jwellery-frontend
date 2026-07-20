import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Truck, CheckCircle2, Clock, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const mockOrders = [
  {
    id: 'ORD-2026-001',
    date: 'July 18, 2026',
    status: 'Delivered',
    statusColor: 'success',
    total: 124500,
    items: [
      { name: 'Solitaire Diamond Engagement Ring (18K Gold)', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=150&auto=format&fit=crop&q=60', qty: 1 },
      { name: 'Classic 22K Gold Chain Necklace', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&auto=format&fit=crop&q=60', qty: 1 },
    ],
  },
  {
    id: 'ORD-2026-002',
    date: 'July 15, 2026',
    status: 'In Transit',
    statusColor: 'primary',
    total: 89500,
    items: [
      { name: 'Royal Emerald Drop Earrings', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=150&auto=format&fit=crop&q=60', qty: 1 },
    ],
  },
  {
    id: 'ORD-2026-003',
    date: 'July 10, 2026',
    status: 'Processing',
    statusColor: 'muted',
    total: 64500,
    items: [
      { name: 'Gold Kada Bracelet (22K Gold)', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=150&auto=format&fit=crop&q=60', qty: 1 },
    ],
  },
];

const statusIcons = {
  Delivered: CheckCircle2,
  'In Transit': Truck,
  Processing: Clock,
  Returned: RotateCcw,
};

export default function OrdersPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
            <Package className="h-5 w-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Recent Orders</h3>
            <p className="text-sm text-muted-foreground">Track your purchases</p>
          </div>
        </div>
        <Link 
          to="/account/orders"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#D4AF37] hover:text-[#B8933D] transition-colors"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      {/* Orders List */}
      <div className="divide-y divide-border">
        {mockOrders.map((order, index) => {
          const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Package;
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
            >
              <Link to={`/account/orders/${order.id}`} className="block">
                <div className="flex gap-4">
                  {/* Product Images */}
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="w-14 h-14 rounded-lg bg-secondary border-2 border-card overflow-hidden"
                        style={{ zIndex: order.items.length - i }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-14 h-14 rounded-lg bg-secondary border-2 border-card flex items-center justify-center text-sm font-medium text-muted-foreground">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  
                  {/* Order Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground text-sm">{order.items[0].name}</p>
                        {order.items.length > 1 && (
                          <p className="text-xs text-muted-foreground">
                            +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold text-foreground">₹{order.total.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          order.statusColor === 'success' && "bg-success/10 text-success",
                          order.statusColor === 'primary' && "bg-[#D4AF37]/10 text-[#D4AF37]",
                          order.statusColor === 'muted' && "bg-muted text-muted-foreground"
                        )}>
                          <StatusIcon className="h-3 w-3" />
                          {order.status}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      <div className="p-4 bg-secondary/20 border-t border-border">
        <Button variant="outline" className="w-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200" asChild>
          <Link to="/account/orders">
            <Package className="h-4 w-4 mr-2" />
            View Order History
          </Link>
        </Button>
      </div>
    </motion.section>
  );
}
