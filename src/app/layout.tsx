import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloGraphQLProvider from "@/providers/ApolloGraphQLProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salubritas Clinic Pro",
  description: "Medical Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloGraphQLProvider>
          {children}
        </ApolloGraphQLProvider>
      </body>
    </html>
  );
}

