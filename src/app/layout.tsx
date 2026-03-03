import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/Footer";
import ThemeProvider from "../components/ThemeProvider";
import Chatbot from "../components/Chatbot";
import Breadcrumb from "../components/Breadcrumb";

export const metadata: Metadata = {
  title: "FinBlog - Analyses & Marches Financiers",
  description: "Le blog de reference pour les analyses de marches financiers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          {children}
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}