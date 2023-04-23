import { Product } from "@/types/products";
import ProductCard from "../product-card";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Products;
