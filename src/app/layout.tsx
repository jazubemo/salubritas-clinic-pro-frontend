import type { Metadata } from "next";
import "./globals.css";
import ApolloGraphQLProvider from "@/providers/ApolloGraphQLProvider";
import Image from "next/image";
import globalBackground from "../../public/generalBackground.jpg";

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
      <body className="min-h-screen w-full flex flex-col items-center justify-center relative bg-slate-950 text-slate-900 antialiased overflow-x-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={globalBackground}
            alt="Salubritas App Background"
            fill
            priority
            className="object-cover object-[25%_center] brightness-90"
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <ApolloGraphQLProvider>{children}</ApolloGraphQLProvider>
      </body>
    </html>
  );
}
