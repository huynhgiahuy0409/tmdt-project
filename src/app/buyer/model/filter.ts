import { Pagination } from 'src/app/_models/pagination';

export interface FilterChain {
  pagination: Pagination;
  name?: string;
  price?: [number, number];
  category?: number;
  brand?: number;
  age?: number
}
