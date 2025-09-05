"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import BootstrapClient from "./bootstrap-client";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
// import { CartProvider } from "@/ContextApi/CartContext";
import ReduxProvider from "@/Redux/ReduxProvider";
import { usePathname } from "next/navigation";


//this will not work on client side rendering
// export const metadata = {
//   title: "My Website - Otaru",
//   description: "Next.js + Bootstrap",
// };

export default function RootLayout({ children }) {
  const pathName = usePathname()
  let hideLayout = false
  if (pathName.startsWith('/admin') || pathName.startsWith('/user/')) {
    hideLayout = true
  }

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <BootstrapClient />
          {!hideLayout && <Navbar />}
          <div className="">{children}</div>
          {!hideLayout && <Footer />}
        </ReduxProvider>
      </body>
    </html>
  );
}