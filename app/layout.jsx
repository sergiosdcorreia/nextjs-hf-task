import "./SASS/globals.scss";

export const metadata = {
  title: "TXo",
  description: "We're hands-on and commited to evolving your business to strive for better.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className='body'>{children}</body>
    </html>
  );
}
