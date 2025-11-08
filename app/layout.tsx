// app/layout.tsx
import "@/app/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Gulicha Real Estate",
  description: "Buy and rent apartments in Ethiopia easily.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
