"use client"

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import throttle from 'lodash/throttle';

export default function Header() {

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const logoRef = useRef(null);
  const asideRef = useRef(null);
  const checkboxRef = useRef(null);
  const handleChange = () => handleCheckboxChange();
  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const handleResize = () => {
    if (timelineRef.current) {
      // Refresh GSAP's calculations on window resize
      ScrollTrigger.refresh();
    }
  };

  const handleMenuEnabling = () => {
    // Get hamburger opacity on mobile
    const currentOpacity = parseFloat(window.getComputedStyle(menuRef.current).opacity);

    // Enable hamburger functionality when opacity is equal or greater than 10%
    if (currentOpacity >= 0.1) {
      checkboxRef.current.disabled = false;
    } else {
      checkboxRef.current.disabled = true;
    }
  };

  const handleMenuEnablingWithThrottle = throttle(handleMenuEnabling, 100);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      let mediaQueries = gsap.matchMedia();

      mediaQueries.add({
        isMobile: "(max-width: 1279px)",
        isDesktop: "(min-width: 1280px)"
      }, (context) => {
        let { isMobile, isDesktop } = context.conditions;

        timelineRef.current = gsap.timeline({
          defaults: { duration: 1 },
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 0',
            end: 'bottom 100',
            scrub: true,
            pin: false,
            onUpdate: handleMenuEnablingWithThrottle,
            onLeave: () => {
              if (checkboxRef.current) {
                menuRef.current.style.opacity = '1';
              }
            },
            onEnterBack: () => {
              if (checkboxRef.current) {
                menuRef.current.style.opacity = '';
              }
            }
          },
        });
        timelineRef.current.to(
          logoRef.current,
          {
            top: isMobile ? '14px' : '40px',
            width: isMobile ? '80px' : '168px',
            height: isMobile ? '36px' : '75px',
            position: 'fixed'
          },
          0
        );
        timelineRef.current.to(
          menuRef.current,
          {
              opacity: 1
          },
          0.3
        );
        timelineRef.current.to(
          asideRef.current,
          {
            opacity: 1
          },
          .5
        )
      })
    });

    window.addEventListener('resize', handleResize);
    menuRef.current.addEventListener('change', handleChange);
    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      if (menuRef.current) {
        menuRef.current.removeEventListener('change', handleChange);
        menuRef.current.style.opacity = '';
      }
    };
  }, []);

  const handleCheckboxChange = () => {
    const isChecked = checkboxRef.current.checked;

    if (isChecked && menuRef.current) {
      // Prevents the user from scrolling when the menu is open
      document.body.style.overflow = 'hidden';
      // Ensures the close button is visible
      menuRef.current.style.opacity = '1';
      // Save timeline progress
      setTimelineProgress(timelineRef.current.progress());
      // Move the timeline progress to the end
      timelineRef.current.progress(1);
    } else {
      // Restore the timeline to its saved progress
      timelineRef.current.progress(timelineProgress);
      // Refresh ScrollTrigger and update
      ScrollTrigger.refresh();
      ScrollTrigger.update(true);
      // Enable scrolling
      document.body.style.overflow = '';
    }
  };

  return (
    <header ref={headerRef} className="header">
      <Image
        ref={logoRef}
        className="logo_img"
        src="/images/txo_logo_2.svg"
        alt="TXo Logo"
        width={600}
        height={266}
        priority
      />
      <div className="topbar">
        <label ref={menuRef} className="hamburger-menu" aria-label="contacts button">
          <input ref={checkboxRef} type="checkbox" disabled onChange={handleCheckboxChange} />
        </label>
        <aside ref={asideRef} className="sidebar" aria-label="enquires and contacts">
          <div className="contact">
            <section className="contact_section grid-section">
              <div>
                <h4 className="contact_title">Enquires</h4>
                <section className="contact_content">
                  <h5 className="contact_subtitle">General</h5>
                  <ul>
                    <li className="contact_content">
                      <a className="contact_phone" href="tel:+4402036134733">+44 (0) 020 3613 4733</a>
                    </li>
                    <li className="contact_content">
                      <a className="contact_email" href="mailto:info@txowork.com">info@txowork.com</a>
                    </li>
                  </ul>
                </section>
              </div>
              <section className="contact_section contact_section-sm">
                <h5 className="contact_subtitle-sm">Sales</h5>
                <ul>
                  <li className="contact_content contact_content-sm">
                    <a className="contact_phone-sm" href="tel:+4402036134733">+44 (0) 020 3613 4733</a>
                  </li>
                  <li className="contact_content contact_content-sm">
                    <a className="contact_email-sm" href="mailto:info@txowork.com">info@txowork.com</a>
                  </li>
                </ul>
              </section>
            </section>
            <section className="contact_section">
              <h4 className="contact_title">Address</h4>
              <div className="contact_content">
                <p className="contact_subtitle">
                  Morelands
                </p>
                <p className="contact_subtitle">
                  5-23 Old Street
                </p>
                <p className="contact_subtitle">
                  London EC1V 9HL
                </p>
              </div>
            </section>
            <section className="contact_section">
              <h4 className="contact_title">Contact</h4>
              <ul>
                <li className="contact_content">
                  <a className="contact_link" href="#" target="_blank">
                    Instagram
                  </a>
                </li>
                <li className="contact_content">
                  <a className="contact_link" href="#" target="_blank">
                    LinkedIn
                  </a>
                </li>
                <li className="contact_content">
                  <a className="contact_link" href="#" target="_blank">
                    Facebook
                  </a>
                </li>
              </ul>
              <div className="contact_border" />
            </section>
          </div>
        </aside>
      </div>
    </header>
  );
}
