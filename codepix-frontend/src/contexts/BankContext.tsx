import { createContext, ReactNode, useContext } from "react";

export const BankContext = createContext<{
  name: string;
  code: string;
  cssCode: string;
}>(null);

export function BankContextProvider({ children }: { children: ReactNode }) {
  const payload = {
    code: process.env.NEXT_PUBLIC_BANK_CODE,
    name: process.env.NEXT_PUBLIC_BANK_NAME,
    get cssCode() {
      return `bank${this.code}`;
    },
  };

  return (
    <BankContext.Provider value={payload}>{children}</BankContext.Provider>
  );
}

export function useBankContext() {
  return useContext(BankContext);
}
