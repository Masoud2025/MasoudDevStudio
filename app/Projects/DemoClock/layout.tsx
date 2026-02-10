import TopAnnouncement from "./components/TextSlider";
import "./ClockStlyes.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body>
        <TopAnnouncement />
        {children}
      </body>
    </html>
  );
}
