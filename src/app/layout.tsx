import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientProvider from "@/context/client-provider";
import QueryProvider from "@/context/query-provider";
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/context/auth-provider";



export const metadata: Metadata = {
  title: "Obir",
  description: "Style tour feet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="antialiased" >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <AuthProvider>
            <QueryProvider>
              <ClientProvider>
                {children}
                <Toaster />
              </ClientProvider>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
