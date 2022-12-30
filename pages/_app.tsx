import "../styles/globals.scss";
import type { AppProps } from "next/app";
import settings from "../data/settings.json";
import { SettingsProvider } from "context/settings";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider settings={settings}>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}

export default MyApp;
