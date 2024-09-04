import Image from "next/image";

export default function Home() {
  return (
    <main>
			<section className="section-container">
				<h1 className="heading-1">We&apos;re hands-on and commited to evolving your business to strive for better.</h1>
        <aside className="offerings">
          <h2 className="offerings_title">Our offering</h2>
          <p className="offerings_body">We provide physical, pragmatic and personal business guidance. Success is never static. Neither are we. We&apos;ll be your business partners for positive change.</p>
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
          <div className="carousel_description">
            <button className="carousel_btn">Read More</button>

          </div>
        </div>
			</section>
      <section className="newsletter-section">
        <h2 className="newsletter_title">
          Stay Updated
        </h2>
        <h3>Newsletter</h3>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Company Name" />
          <input type="email" placeholder="Email Address" />
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}
