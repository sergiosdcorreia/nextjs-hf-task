"use client"

import { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Header() {

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const logoRef = useRef(null);
  const logoSidebarRef = useRef(null);
  const checkboxRef = useRef(null);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 0",
          end: 'bottom 2000',
          // end: `bottom ${window.innerHeight / 2}`,
          scrub: true,
          // pin: true,
          onLeave: () => {
            // Enable the checkbox when leaving the trigger (when scrolling down completely)
            if (checkboxRef.current) {
              checkboxRef.current.disabled = false;
              logoRef.current.style.display = 'none';
              logoSidebarRef.current.style.display = 'block';
              menuRef.current.style.opacity = '1';
            }
          },
          onEnterBack: () => {
            // Disable the checkbox when re-entering the trigger (when scrolling back up)
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
      if (!isScrollEnabled) {
        tl.scrollTrigger.disable();
      } else {
        tl.scrollTrigger.enable();
      }
    });
    return () => {
      ctx.revert();
      if (checkboxRef.current) {
        checkboxRef.current.removeEventListener("change", () => {});
      };
      document.body.style.overflow = '';
      menuRef.current.style.opacity = '';
    };
  }, [isScrollEnabled]);

  const handleCheckboxChange = () => {
    const isChecked = checkboxRef.current.checked;
    setIsScrollEnabled(!isChecked);

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
        src="/txo_logo_2.svg"
        alt="TXo Logo"
        width={600}
        height={266}
        priority
      />
      <div className="topbar">
        <Image
          ref={logoSidebarRef}
          className="logo_img_sidebar"
          src="/txo_logo_2.svg"
          alt="TXo Logo"
          width={80}
          height={36}
          priority
        />
        <label ref={menuRef} className="hamburger-menu">
          <input ref={checkboxRef} type="checkbox" disabled onChange={handleCheckboxChange} />
        </label>
        <aside className="sidebar">
          <nav className="nav">
            <div>ENQUIRES</div>
            <div>ADDRESS</div>
            <div>CONNECT</div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
