import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

interface Props {
  products: Product[];
}

const DESIGN_ATTRIBUTE_SIZE = "Talle";

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

const Products = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => {
        const image = product.images[0];
        const sizes = product.attributes.find(
          (att) => att.name === DESIGN_ATTRIBUTE_SIZE
        );
        const hrefSlug = `/product/${product.slug}`;

        return (
          <div key={product.id} className="group relative">
            <Link href={hrefSlug}>
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={image.src}
                  width={300}
                  height={400}
                  alt={image.alt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  style={{ mixBlendMode: "multiply", filter: "contrast(1)" }}
                />
              </div>
            </Link>
            <div className="flex justify-center flex-col text-center">
              <Link href={hrefSlug}>
                <div className="mt-2 text-sm font-medium text-gray-700 h-[40px] flex justify-center items-center">
                  {product.name}
                </div>
              </Link>
              {!!sizes?.options?.length && (
                <div className="flex justify-center items-center mt-2 text-sm text-gray-700">
                  {sizes.options.map((size) => (
                    <div
                      key={size}
                      className="rounded-md mx-1 w-[30px] h-[30px] p-[3px] text-center border-solid border-2 border-black"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-1 text-lg font-medium text-gray-900">
                {`Desde ${formatter.format(Number(product.price))}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
