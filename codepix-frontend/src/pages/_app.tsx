import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BankContextProvider } from "../contexts/BankContext";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <BankContextProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </BankContextProvider>
  );
}

export default MyApp;
