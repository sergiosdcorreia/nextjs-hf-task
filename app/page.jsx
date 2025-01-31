'use client'

import { useRef, useEffect } from 'react';
import { wrapGrid } from 'animate-css-grid';
import Carousel from './components/carousel';

export default function Home() {
  const heroRef = useRef(null);
  const mediaQuery1 = useRef();
  const mediaQuery2 = useRef();

useEffect(() => {
  if (typeof window !== 'undefined') {
    mediaQuery1.current = window.matchMedia('(min-width: 48em)');
    mediaQuery2.current = window.matchMedia('(min-width: 80em)');

    if (heroRef.current) {
      const { forceGridAnimation } = wrapGrid(heroRef.current, {
        duration: 500,
        easing: 'easeInOut',
      });

      const handleMediaQueryChange = () => {
        if (heroRef.current) {
          heroRef.current.style.gridTemplateColumns = mediaQuery1.matches
            ? mediaQuery2.matches
              ? 'repeat(8, 1fr)'
              : 'repeat(5, 1fr)'
            : '1fr';
          
          forceGridAnimation()
          heroRef.current.offsetHeight;
        }
      };

      // Set initial grid layout based on media query
      handleMediaQueryChange();

      mediaQuery1.current.addEventListener('change', handleMediaQueryChange);
      mediaQuery2.current.addEventListener('change', handleMediaQueryChange);

      return () => {
        // Cleanup media query listeners
        mediaQuery1.current.removeEventListener('change', handleMediaQueryChange);
        mediaQuery2.current.removeEventListener('change', handleMediaQueryChange);
      };
    }
  }
}, [mediaQuery1, mediaQuery2]);

  return (
    <main>
			<section ref={heroRef} className="hero">
        <div className="hero_title-container">
				  <h1 className="hero_title">We&#39;re hands-on and commited to evolving your business to strive for better.</h1>
        </div>
        <div className="hero_offerings-container">
          <div className="hero_offerings">
            <h2 className="hero_offerings_title">Our offering</h2>
            <p className="hero_offerings_body">We provide physical, pragmatic and personal business guidance. Success is never static. Neither are we. We&#39;ll be your business partners for positive change.</p>
          </div>
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
