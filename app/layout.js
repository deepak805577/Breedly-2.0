import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from "./components/Loader";

export const metadata = {
  title: "BreedLy - Know About Paws",
  description: "Find your perfect dog companion with BreedLy",
  icons: { icon: "/Dog face.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Loader /> {/* Always on top */}
        <Navbar />
        <main className="page-content">
          {children} {/* All pages inside here require login */}
        </main>
        <Footer />
      </body>
    </html>
  );
}
