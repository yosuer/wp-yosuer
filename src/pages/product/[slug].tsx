import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Size from "@/components/size";
import { HeaderAndFooter } from "@/types/layout";
import { Product, Variation } from "@/types/products";
import { formatPrice } from "@/utils";
import { headerAndFooterMock } from "@/utils/mock-data";
// import axios from "axios";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  findAllProducts,
  findProductVariations,
  findProductsByIds,
  getProductBySlug,
} from "@/services/product.service";
import ProductCard from "@/components/product-card";

const SIZE_ATTRIBUTE_NAME = "Talle";

interface Props {
  headerAndFooter: HeaderAndFooter;
  product: Product;
  relatedProducts: Product[];
  variations: Variation[];
}

export default function ProductPage({
  headerAndFooter,
  product,
  variations,
  relatedProducts,
}: Props) {
  const router = useRouter();
  const { query, pathname, replace } = router;

  const [variationId, setVariationId] = useState<number>();

  useEffect(() => {
    if (!query.variation) {
      return;
    }
    setVariationId(+query.variation);
  }, [query.variation]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const variationPrices = variations
    .map(({ price }) => Number(price))
    .sort((a, b) => a - b);
  const lowestPrice = variationPrices[0];
  const highestPrice = variationPrices[variationPrices.length - 1];
  const variation = variations.find(({ id }) => id === variationId);

  const handleSelectVariation = (id: number) => {
    replace({ pathname, query: { ...query, variation: id } }, undefined, {
      shallow: true,
    });
    setVariationId(id);
  };
  const image = product.images[0];
  const productAttributes = product.attributes.filter(
    (attr) => attr.name !== SIZE_ATTRIBUTE_NAME
  );

  return (
    <Layout headerAndFooter={headerAndFooter}>
      <div className="flex flex-col md:flex-row md:mx-10">
        <div className="md:basis-1/2">
          <Image
            src={image.src}
            width={300}
            height={350}
            className="h-full w-full object-cover object-center"
            alt={image.alt}
          />
        </div>
        <div className="md:basis-1/2 flex flex-col md:ml-5">
          <h1 className="text-2xl mt-1 mb-3">{product.name}</h1>
          {variation?.price ? (
            <div className="text-xl mb-2">{formatPrice(variation.price)}</div>
          ) : (
            <div className="text-xl mb-2">
              {variations.length > 1
                ? `${formatPrice(lowestPrice)} - ${formatPrice(highestPrice)}`
                : formatPrice(product.price)}
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: product.short_description }}
            className="leading-loose mt-2 mb-2"
          />
          <div className="mb-5">
            <div className="mb-2">Talles:</div>
            <div className="flex flex-row">
              {variations.map(({ id, attributes }) => {
                const sizeAttribute = attributes.find(
                  (attr) => attr.name === SIZE_ATTRIBUTE_NAME
                );
                if (!sizeAttribute) {
                  return null;
                }
                return (
                  <Size
                    key={id}
                    value={sizeAttribute.option}
                    onSelect={() => handleSelectVariation(id)}
                    active={id === variationId}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <button className="rounded-md w-[120px] h-[50px] text-white bg-gray-600 border-solid border-2 border-gray">
              Comprar
            </button>
          </div>
          <div className="mb-2">Información Adicional: </div>
          <div>
            {productAttributes.map((attr) => {
              return (
                <div key={attr.id} className="flex flex-row justify-start mb-1">
                  <div className="basis-1/2 md:basis-1/3 font-medium">
                    {attr.name}
                  </div>
                  <div className="basis-1/2 md:basis-1/3">
                    {attr.options.join(", ")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="font-semibold text-lg mb-3">Productos Relacionados</div>
        <div className="flex flex-row gap-3 overflow-x-scroll justify-center w-[100%]">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-[150px] md:w-auto"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const { data: products }: { data: Product[] } = await wpApi.get("products", {
  //   slug: params?.slug,
  // });
  const product = await getProductBySlug(params?.slug as string);

  if (!product) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  const variations = await findProductVariations(product.id);

  const relatedProducts = await findProductsByIds(
    product.related_ids.slice(0, 4)
  );

  // const { data: headerAndFooter } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`
  // );

  return {
    props: {
      headerAndFooter: headerAndFooterMock,
      product,
      variations,
      relatedProducts,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const products = await findAllProducts();
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
