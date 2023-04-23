enum ProductType {
  VARIABLE = "variable",
}

interface ProductImage {
  id: number;
  alt: string;
  name: string;
  src: string;
}

interface Attribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

interface VariationAttribute {
  id: number;
  name: string;
  option: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: string;
  regular_price: string;
  description: string;
  short_description: string;
  slug: string;
  status: string;
  permalink: string;
  stock_quantity: number;
  stock_status: string;
  type: ProductType;
  virtual: boolean;
  variations: number[];
  caterogories: Category[];
  attributes: Attribute[];
  images: ProductImage[];
  related_ids: number[];
}

export interface Variation {
  id: number;
  sku: string;
  price: string;
  attributes: VariationAttribute[];
  image: ProductImage;
  stock_quantity: number;
  stock_status: string;
}
