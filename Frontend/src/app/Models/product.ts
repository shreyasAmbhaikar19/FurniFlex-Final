export interface Product {
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
