export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  description: string;
}

export interface ProductResponse {
  success: boolean;

  page: number;

  limit: number;

  total: number;

  hasMore: boolean;

  data: Product[];
}
