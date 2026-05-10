import "./globals.css";

export const metadata = {
  title: "3D Z-Axis Circular Gallery",
  description: "A gorgeous template featuring image cards moving on a 3D circle in the Z-axis (3D carousel) controlled by scroll.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
