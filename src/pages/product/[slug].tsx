import Layout from "@/components/layout";
import { HeaderAndFooter } from "@/types/layout";
import { Product, Variation } from "@/types/products";
import { headerAndFooterMock } from "@/utils/mock-data";
import wpApi from "@/utils/wp-api";
import axios from "axios";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const SIZE_ATTRIBUTE_NAME = "Talle";

interface Props {
  headerAndFooter: HeaderAndFooter;
  product: Product;
  variations: Variation[];
}

export default function ProductPage({
  headerAndFooter,
  product,
  variations,
}: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const image = product.images[0];
  const sizeAttr = product.attributes.find(
    (att) => att.name === SIZE_ATTRIBUTE_NAME
  );
  return (
    <Layout headerAndFooter={headerAndFooter}>
      <div className="flex mx-10">
        <div className="basis-1/4">
          <Image
            src={image.src}
            width={300}
            height={350}
            className="h-full w-full object-cover object-center"
            alt={image.alt}
          />
        </div>
        <div className="basis-3/4 flex flex-col ml-5">
          <div>{product.name}</div>
          <div>{`$ ${product.price}`}</div>
          <div
            dangerouslySetInnerHTML={{ __html: product.short_description }}
            className="leading-loose"
          />
          {!!sizeAttr && (
            <div className="flex flex-row">
              {sizeAttr?.options.map((size) => (
                <div key={size}>{size}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: products }: { data: Product[] } = await wpApi.get("products", {
    slug: params?.slug,
  });

  if (!products.length) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  const [product] = products;

  const { data: variations } = await wpApi.get(
    `products/${product.id}/variations`
  );

  // const { data: headerAndFooter } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`
  // );

  return {
    props: {
      headerAndFooter: headerAndFooterMock,
      product,
      variations,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const { data: products }: { data: Product[] } = await wpApi.get("products");

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
