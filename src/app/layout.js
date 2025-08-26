import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import BootstrapClient from "./bootstrap-client";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
// import { CartProvider } from "@/ContextApi/CartContext";
import ReduxProvider from "@/Redux/ReduxProvider";

export const metadata = {
  title: "My Website - Otaru",
  description: "Next.js + Bootstrap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {/* <CartProvider> */}
          <BootstrapClient />
          <Navbar />
          <div className="">{children}</div>
          <Footer />
          {/* </CartProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}