import { buttonVariants } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Obir | Authenticate",
    description: "Authenticate to obir",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased relative" >
                <Link href="/" className={`${buttonVariants({ variant: "ghost" })} absolute top-4 right-6`}>
                    Home
                </Link>
                {children}
            </body>
        </html>
    );
}


