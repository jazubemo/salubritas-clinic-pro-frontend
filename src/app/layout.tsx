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
      <body  className="relative min-h-screen w-full flex flex-col items-center justify-center isolation-auto
            before:absolute before:inset-0 before:-z-10 before:opacity-[0.08]
            before:bg-[url('/hospital.png')] before:bg-cover before:bg-center before:bg-no-repeat">
        <ApolloGraphQLProvider>{children}</ApolloGraphQLProvider>
      </body>
    </html>
  );
}
