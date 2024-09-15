import Carousel from "./components/carousel";

export default function Home() {
  return (
    <main>
			<section className="hero">
				<h1 className="hero_title">We&apos;re hands-on and commited to evolving your business to strive for better.</h1>
        <div className="hero_offerings">
          <h2 className="hero_offerings_title">Our offering</h2>
          <p className="hero_offerings_body">We provide physical, pragmatic and personal business guidance. Success is never static. Neither are we. We&apos;ll be your business partners for positive change.</p>
        </div>
			</section>
      <Carousel />
      <section className="newsletter-section">
        <h2 className="newsletter_title">
          Stay Updated
        </h2>
        <p className="newsletter_subtitle">Newsletter</p>
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
