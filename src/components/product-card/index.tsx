import { Product } from "@/types/products";
import cx from "classnames";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils";

interface Props {
  product: Product;
  className?: string;
}

const DESIGN_ATTRIBUTE_SIZE = "Talle";

const ProductCard = ({ product, className }: Props) => {
  const image = product.images[0];
  const sizes = product.attributes.find(
    (att) => att.name === DESIGN_ATTRIBUTE_SIZE
  );
  const slug = `/product/${product.slug}`;

  return (
    <div key={product.id} className={cx("group relative", className)}>
      <Link href={slug}>
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
        <Link href={slug}>
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
          {`Desde ${formatPrice(product.price)}`}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
