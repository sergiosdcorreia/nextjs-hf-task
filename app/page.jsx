import Image from "next/image";

export default function Home() {
  return (
    <main>
			<Image
				className="logo_img"
				src="/txo_logo_2.svg"
				alt="TXO Logo"
				width={600}
				height={266}
				priority
			/>
    </main>
  );
}
