import { Header } from "@/types/layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Props {
  header: Header;
}

const Header = ({ header }: Props) => {
  const { headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon } =
    header;
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={favicon} />
      </Head>
      <div className="container mx-auto py-5">
        <div className="flex flex-row items-center justify-between mx-auto">
          <div>
            <Link href="/">
              <Image src={siteLogoUrl} alt="logo" width={200} height={100} />
            </Link>
          </div>
          {/* <div className="flex flex-row items-center justify-between basis-1/3 uppercase">
            {headerMenuItems.map((itemMenu) => (
              <div key={itemMenu.ID}>{itemMenu.title}</div>
            ))}
          </div> */}
          <div className="flex flex-row items-center justify-around basis-1/6">
            <div>My account</div>
            <div>CART</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
