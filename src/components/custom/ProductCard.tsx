'use client';

import { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-[#1A1A2E] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#00AFFF] transition-all duration-300 group">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-white group-hover:neon-blue transition-all duration-300 line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm px-2 py-1 bg-[#FF007F]/20 text-[#FF007F] rounded-lg font-semibold whitespace-nowrap">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold neon-pink">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#00AFFF] to-[#FF007F] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00AFFF]/50 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
