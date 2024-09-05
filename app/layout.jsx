import Footer from "./components/footer";
import Header from "./components/header";
import "./styles/globals.scss";

export const metadata = {
  title: "TXo",
  description: "We're hands-on and commited to evolving your business to strive for better.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className='body'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
