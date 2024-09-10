import Carousel from "./components/carousel";

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
      <Carousel />
      <section className="newsletter-section">
        <h3 className="newsletter_title">
          Stay Updated
        </h3>
        <h2 className="newsletter_subtitle">Newsletter</h2>
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
