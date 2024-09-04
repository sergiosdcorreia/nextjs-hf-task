import Image from "next/image";

export default function Home() {
  return (
    <main>
			<section className="section-container">
				<h1 className="heading-1">We're hands-on and commited to evolving your business to strive for better.</h1>
        <aside className="offerings">
          <h2 className="offerings_heading-2">Our offering</h2>
          <p className="offerings_text">We provide physical, pragmatic and personal business guidance. Success is never static. Neither are we. We'll be your business partners for positive change.</p>
        </aside>
			</section>
      <section className="carousel-section">
				<div className="carousel-container">
          <Image
            className="carousel_img"
            src="/images/c1.jpg"
            alt="Sample title"
            width={1940}
            height={1176}
          />
          <div className="carousel_subtitle">
            <p>Name: Sample Title</p>
            <p>Availability: [Now]</p>
          </div>
        </div>
			</section>
    </main>
  );
}
