import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modal/Modal";

export const metadata: Metadata = {
  title: "Airbnb Better",
  description: "The better version of Airbnb",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <Modal isOpen title="Hello World" actionLabel="Submit" />
        {children}
      </body>
    </html>
  );
}
