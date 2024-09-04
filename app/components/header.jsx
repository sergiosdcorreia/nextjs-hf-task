"use client"

import { useRef, useEffect } from 'react';
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Header() {

  const sectionRef = useRef(null);
  const menu = useRef(null);
  const logo = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
        },
      });
      tl.to(
        logo.current,
        {
          top: "14px",
          width: "80px",
          height: "36px",
          position: "fixed"
        },
        0
      );
      tl.to(
        menu.current,
        {
            opacity: 1
        },
        0
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="header">
      <Image
        ref={logo}
        className="logo_img"
        src="/txo_logo_2.svg"
        alt="TXo Logo"
        width={600}
        height={266}
        priority
      />
      <div className="topbar">
        <label ref={menu} className="hamburger-menu">
          <input type="checkbox" />
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