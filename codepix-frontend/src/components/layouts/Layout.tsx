import { PropsWithChildren, ReactNode } from "react";
import { BankAccount } from "../../shared/types";
import { Footer } from "../Footer";
import { MainContent } from "../MainContent";
import { NavBar } from "../NavBar";

interface LayoutProps {
  bankAccount?: BankAccount;
}

export function Layout({
  children,
  bankAccount,
}: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <NavBar />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
}
