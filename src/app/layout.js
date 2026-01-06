"use client";

import Header from "@/components/Header";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}