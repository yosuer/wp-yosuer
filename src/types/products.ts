enum ProductType {
  VARIABLE = "variable",
}

interface Image {
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
  id: string;
  name: string;
  sku: string;
  price: string;
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
  images: Image[];
}

export interface Variation {
  id: number;
  sku: string;
  price: string;
  attributes: VariationAttribute[];
  image: Image;
  stock_quantity: number;
  stock_status: string;
}
