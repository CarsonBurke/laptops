import Footer from "../components/footer";
import { Navbar } from "../components/navbar";
import { MediaContextProvider } from "./media";

export function LayoutBody({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MediaContextProvider>
      <Navbar />
      {children}
      <Footer />
    </MediaContextProvider>
  );
}
