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
  // const [scrollY, setScrollY] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

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

      let mediaQueries = gsap.matchMedia();

      mediaQueries.add({
        isMobile: "(max-width: 959px)",
        isDesktop: "(min-width: 960px)"
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

    menuRef.current.addEventListener('change', handleChange);
    return () => {
      ctx.revert();
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
        <label ref={menuRef} className="hamburger-menu">
          <input ref={checkboxRef} type="checkbox" disabled onChange={handleCheckboxChange} />
        </label>
        <aside ref={asideRef} className="sidebar">
          <nav className="nav">
            <div className="nav_section">
              <p className="nav_title">Enquires</p>
              <div className="nav_content">
                <p className="nav_subtitle">General</p>
                <a className="nav_phone" href="tel:+4402036134733">+44 (0) 020 3613 4733</a>
                <a className="nav_email" href="mailto:info@txowork.com">info@txowork.com</a>
              </div>
            </div>
            <div className="nav_section nav_section-sm">
              <div className="nav_content nav_content-sm">
                <p className="nav_subtitle-sm">Sales</p>
                <a className="nav_phone-sm" href="tel:+4402036134733">+44 (0) 020 3613 4733</a>
                <a className="nav_email-sm" href="mailto:info@txowork.com">info@txowork.com</a>
              </div>
            </div>
            <div className="nav_section">
              <p className="nav_title">Address</p>
              <div className="nav_content">
                <p className="nav_subtitle">
                  Morelands<br />
                  5-23 Old Street<br />
                  London EC1V 9HL
                </p>
              </div>
            </div>
            <div className="nav_section">
              <p className="nav_title">Contact</p>
              <div className="nav_content">
                <a className="nav_link" href="#" target="_blank">
                  Instagram
                </a>
                <a className="nav_link" href="#" target="_blank">
                  LinkedIn
                </a>
                <a className="nav_link" href="#" target="_blank">
                  Facebook
                </a>
              </div>
              <div className="nav_border"></div>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
