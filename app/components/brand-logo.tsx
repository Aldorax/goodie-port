import Image from "next/image";

export default function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Image
      src="/commissioner-of-stories-logo.png"
      alt="Commissioner of Stories — Stories, Strategy, Impact"
      width={1254}
      height={1254}
      className={footer ? "brand-logo brand-logo-footer" : "brand-logo"}
      sizes={footer ? "200px" : "(max-width: 700px) 70px, 88px"}
      loading={footer ? "lazy" : "eager"}
    />
  );
}
