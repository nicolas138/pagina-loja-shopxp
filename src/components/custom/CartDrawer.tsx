'use client';

import { CartItem } from '@/lib/types';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#1A1A2E] border-l border-[#00AFFF]/30 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 neon-blue" />
              <h2 className="text-2xl font-bold text-white">
                Cart <span className="neon-pink">({itemCount})</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <ShoppingBag className="w-20 h-20 text-gray-700" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-600 text-sm">Add some products to get started!</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-black/30 rounded-xl border border-gray-800 hover:border-[#00AFFF]/50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-white line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm neon-pink font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3 text-white" />
                        </button>
                        <span className="text-white font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors ml-auto"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-800 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-400">Subtotal:</span>
                <span className="font-bold neon-blue text-2xl">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-[#00AFFF] to-[#FF007F] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#00AFFF]/50 hover:scale-[1.02] transition-all duration-300 active:scale-95">
                Checkout Now
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
