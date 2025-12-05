'use client';

import { useState, useMemo } from 'react';
import { Product, CartItem, Category } from '@/lib/types';
import ProductCard from '@/components/custom/ProductCard';
import CartDrawer from '@/components/custom/CartDrawer';
import { ShoppingCart, Search, Sparkles } from 'lucide-react';

// Mock products data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    price: 299.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Premium noise-cancelling headphones with 30h battery life',
  },
  {
    id: '2',
    name: 'Smart Watch Ultra',
    price: 449.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Advanced fitness tracking with AMOLED display',
  },
  {
    id: '3',
    name: 'Designer Backpack',
    price: 89.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'Stylish and durable backpack for everyday use',
  },
  {
    id: '4',
    name: 'Premium Sunglasses',
    price: 159.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    description: 'UV protection with polarized lenses',
  },
  {
    id: '5',
    name: 'Cotton T-Shirt',
    price: 29.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: '100% organic cotton, comfortable fit',
  },
  {
    id: '6',
    name: 'Denim Jacket',
    price: 79.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Classic denim jacket with modern cut',
  },
  {
    id: '7',
    name: 'Smart Speaker',
    price: 129.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=400&fit=crop',
    description: 'Voice-controlled smart speaker with premium sound',
  },
  {
    id: '8',
    name: 'Ceramic Vase',
    price: 49.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop',
    description: 'Handcrafted ceramic vase for modern homes',
  },
  {
    id: '9',
    name: 'Leather Wallet',
    price: 69.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    description: 'Genuine leather wallet with RFID protection',
  },
  {
    id: '10',
    name: 'Running Shoes',
    price: 119.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Lightweight running shoes with cushioned sole',
  },
  {
    id: '11',
    name: 'Desk Lamp',
    price: 59.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    description: 'Adjustable LED desk lamp with touch control',
  },
  {
    id: '12',
    name: 'Wireless Mouse',
    price: 39.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    description: 'Ergonomic wireless mouse with precision tracking',
  },
];

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'home', label: 'Home' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart functions
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#1A1A2E]/95 backdrop-blur-lg border-b border-[#00AFFF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 neon-blue" />
              <h1 className="text-3xl font-bold">
                <span className="neon-blue">Shop</span>
                <span className="neon-pink">XP</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="hidden sm:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/30 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00AFFF] transition-colors"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-gradient-to-r from-[#00AFFF] to-[#FF007F] rounded-xl hover:shadow-lg hover:shadow-[#00AFFF]/50 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF007F] text-white text-xs font-bold rounded-full flex items-center justify-center neon-glow-pink">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00AFFF] transition-colors"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-[#00AFFF] to-[#FF007F] text-white shadow-lg shadow-[#00AFFF]/50 scale-105'
                    : 'bg-[#1A1A2E] text-gray-400 border border-gray-800 hover:border-[#00AFFF] hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {selectedCategory === 'all' ? 'All Products' : CATEGORIES.find(c => c.value === selectedCategory)?.label}
          </h2>
          <p className="text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-20 h-20 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-600 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}
