export interface Product {
  discount: number;
monthlyPrice: any;
createdAt: string|number|Date;
subscriptions: any;
  _id: string;
  name: string;
  description: string;
  brand?: string; 
  category?: string; 
  price: number;
  discountPrice?: number;
  rentDuration?: number;
  images: string[];
  stock: number;
  ratings: number;
  numOfReviews: number;
  user?: string; 
  reviews?: any[];
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
}