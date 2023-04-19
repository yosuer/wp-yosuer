import "@/styles/index.scss";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className} style={{ margin: "0 40px" }}>
      <Component {...pageProps} />
    </div>
  );
}
