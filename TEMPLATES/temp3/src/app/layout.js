import "./globals.css";

export const metadata = {
  title: "Diagonal Sine Gallery",
  description: "A gorgeous template featuring image cards moving on a diagonal sine-wave path controlled by scroll.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
