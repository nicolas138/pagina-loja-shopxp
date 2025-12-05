export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'all' | 'electronics' | 'clothing' | 'accessories' | 'home';
