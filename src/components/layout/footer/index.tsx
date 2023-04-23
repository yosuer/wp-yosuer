import { Footer } from "@/types/layout";

interface Props {
  footer: Footer;
}

const Footer = ({ footer }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-center bg-neutral-200 py-5 px-5">
      <div className="basis-1 sm:basis-1/3">
        GHunay 2023 by Gisela Hernandez
      </div>
      <div className="basis-1 sm:basis-1/3">
        <div className="font-semibold">Enlaces</div>
        {footer.footerMenuItems.map((item) => (
          <div key={item.ID}>{item.title}</div>
        ))}
      </div>
      <div className="basis-1 sm:basis-1/3">
        <div className="font-semibold">Contáctenos</div>
        <div>Email: jisel@gmail.com</div>
        <div>Tel: (011)8989-5899</div>
      </div>
    </div>
  );
};

export default Footer;
