// app/layout.tsx
import "@/app/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Gulicha",
  description: "Buy and rent apartments in Ethiopia easily.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
