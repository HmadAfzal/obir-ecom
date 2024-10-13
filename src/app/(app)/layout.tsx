import Footer from "@/components/globals/footer";
import Header from "@/components/globals/header";
import type { Metadata } from "next";
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

            <body >
                <Header/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}
