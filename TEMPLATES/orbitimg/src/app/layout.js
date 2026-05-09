import "./globals.css";

export const metadata = {
  title: "Reverie | Fall Into Dreams",
  description: "Singular voyages to astonishing destinations, shaped for those who seek beauty beyond the ordinary.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
