import { ReactNode } from "react";
import { Footer } from "../Footer";
import { MainContent } from "../MainContent";
import { NavBar } from "../NavBar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
}
