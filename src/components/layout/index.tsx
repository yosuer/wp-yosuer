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

      <main className="container py-4 my-0 mx-[10px] md:mx-[40px] min-h-50vh">
        {children}
      </main>

      <Footer footer={headerAndFooter.footer} />
    </>
  );
};

export default Layout;
