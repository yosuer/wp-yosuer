import { HeaderAndFooter } from "@/types/layout";
import Footer from "./footer";
import Header from "./header";

interface Props {
  headerAndFooter: HeaderAndFooter;
  children: any;
}

const Layout = ({ headerAndFooter, children }: Props) => {
  return (
    <>
      <Header header={headerAndFooter.header} />

      <main className="container mx-auto py-4 min-h-50vh">{children}</main>

      <Footer footer={headerAndFooter.footer} />
    </>
  );
};

export default Layout;
