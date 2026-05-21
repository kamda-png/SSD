export interface Product {
  id: string;
  name: string;
  englishName: string;
  description: string;
  detailDescription?: string;
  price: number;
  category: 'bread' | 'cake' | 'signature';
  image: string;
  tags: string[];
  bestSeller?: boolean;
  ingredients?: string[];
  calories?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Branch {
  name: string;
  address: string;
  hours: string;
  phone: string;
  description: string;
  mapX: number; // For styling pinpoint location on map percentage
  mapY: number; // For styling pinpoint location on map percentage
}

export interface Review {
  id: string;
  name: string;
  productName: string;
  rating: number;
  content: string;
  tag: string;
  date: string;
  likes: number;
}

export interface StoryEvent {
  year: string;
  title: string;
  description: string;
  bgImageUrl?: string;
}
