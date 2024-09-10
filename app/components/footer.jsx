import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <Image
        className="footer_img"
        src="/images/thirdway_logo.png"
        alt="Thirdway Logo"
        width={600}
        height={266}
      />
      <a href="#" target="_blank">Terms and Conditions</a>
      <a href="#" target="_blank">Privacy Policy</a>
      <a href="#" target="_blank">Cookie Policy</a>
      <a href="#" target="_blank">Accessibility</a>
    </footer>
  );
}
