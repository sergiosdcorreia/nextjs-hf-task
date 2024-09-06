"use client"

import { useRef, useEffect } from 'react';
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Header() {

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const logoRef = useRef(null);
  const logoSidebarRef = useRef(null);
  const checkboxRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 0",
          end: 'bottom 1400',
          scrub: true,
          pin: true,
          onLeave: () => {
            if (checkboxRef.current) {
              checkboxRef.current.disabled = false;
              logoRef.current.style.display = 'none';
              logoSidebarRef.current.style.display = 'block';
              menuRef.current.style.opacity = '1';
            }
          },
          onEnterBack: () => {
            if (checkboxRef.current) {
              checkboxRef.current.disabled = true;
              logoRef.current.style.display = '';
              logoSidebarRef.current.style.display = 'none';
            }
          }
        },
      });
      tl.to(
        logoRef.current,
        {
          top: "14px",
          width: "80px",
          height: "36px",
          position: "fixed"
        },
        0
      );
      tl.to(
        menuRef.current,
        {
            opacity: 1
        },
        0
      );
    });
    return () => {
      ctx.revert();
      if (checkboxRef.current) {
        checkboxRef.current.removeEventListener("change", () => {});
      };
      document.body.style.overflow = '';
      menuRef.current.style.opacity = '';
    };
  }, []);

  const handleCheckboxChange = () => {
    const isChecked = checkboxRef.current.checked;

    if (isChecked && menuRef.current) {
      document.body.style.overflow = 'hidden';
      menuRef.current.style.opacity = '1';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <header className="header">
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
        <Image
          ref={logoSidebarRef}
          className="logo_img_sidebar"
          src="/images/txo_logo_2.svg"
          alt="TXo Logo"
          width={80}
          height={36}
        />
        <label ref={menuRef} className="hamburger-menu">
          <input ref={checkboxRef} type="checkbox" disabled onChange={handleCheckboxChange} />
        </label>
        <aside className="sidebar">
          <nav className="nav">
            <div className="nav_section flex">
              <div className="nav_divider">
                <p className="nav_title">Enquires</p>
                <div className="nav_content">
                  <p className="nav_subtitle">General</p>
                  <a className="nav_phone" href="tel:+4402036134733">+44 (0) 020 3613 4733</a>
                  <a className="nav_email" href="mailto:info@txowork.com">info@txowork.com</a>
                </div>
              </div>
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
