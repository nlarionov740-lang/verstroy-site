import { Manrope, JetBrains_Mono } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function CottageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
