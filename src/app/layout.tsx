import type { Metadata } from "next";
import "@/styles/globals.css";
import Providers from "@/app/_trpc/Providers";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Next App with tRPC example",
  description: "Generated by create next app",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
