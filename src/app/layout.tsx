import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/context/client-provider";
import QueryProvider from "@/context/query-provider";
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/context/auth-provider";



export const metadata: Metadata = {
  title: "Obir",
  description: "Style your feet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="antialiased" >
          <QueryProvider>
            <ClientProvider>
              {children}
              <Toaster />
            </ClientProvider>
          </QueryProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
