import "../styles/globals.css";
import { AppProvider } from "../../public/context/AppContext";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        refreshInterval: 0,
      }}
    >
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SWRConfig>
  );
}

export default MyApp;
