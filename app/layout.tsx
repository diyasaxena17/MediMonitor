import type { Metadata } from "next";
import "./globals.css";
import { MedicationProvider } from "./MedicationContext";

export const metadata: Metadata = {
  title: "MediMonitor - Medication Adherence",
  description: "Accessibility-first medication adherence tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MedicationProvider>
          {children}
        </MedicationProvider>
      </body>
    </html>
  );
}
