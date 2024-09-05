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
            <aside className="carousel_text-visible">
              <p>Name: Sample Title</p>
              <p>Availability: [Now]</p>
            </aside>
            <aside>
            </aside>
            <button className="carousel_btn">Read More</button>
          </div>
        </div>
			</section>
      <section className="newsletter-section">
        <h2 className="newsletter_title">
          Stay Updated
        </h2>
        <h3 className="newsletter_subtitle">Newsletter</h3>
        <form className="newsletter_form">
          <input className="newsletter_name" type="text" name="Full Name" placeholder="Full Name" />
          <input className="newsletter_company" type="text" name="Company Name" placeholder="Company Name" />
          <input className="newsletter_email" type="email" name="Email Address" placeholder="Email Address" />
          <button className="newsletter_btn" type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}
