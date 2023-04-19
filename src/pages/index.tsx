import axios from "axios";
import wpApi from "@/utils/wp-api";
import { HeaderAndFooter } from "@/types/layout";
import Products from "@/components/products";
import Layout from "@/components/layout";
import { headerAndFooterMock } from "@/utils/mock-data";

interface Props {
  headerAndFooter: HeaderAndFooter;
  products: any;
}

export default function Home({ headerAndFooter, products }: Props) {
  return (
    <Layout headerAndFooter={headerAndFooter}>
      <div className="h-[50px]" />
      <Products products={products} />
    </Layout>
  );
}

export async function getStaticProps() {
  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`
  // );
  const { data: products } = await wpApi.get("products", { per_page: 50 });

  return {
    props: {
      headerAndFooter: headerAndFooterMock,
      products,
    },
    revalidate: 1,
  };
}
