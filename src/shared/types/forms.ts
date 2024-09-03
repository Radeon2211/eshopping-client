import { ProductCondition, ProductPhotoFieldValue } from './enums';

export type AddProductForm = {
  name: string;
  price: number | '';
  quantity: number;
  condition: ProductCondition;
  description: string;
  photo: ProductPhotoFieldValue | File | null;
};
