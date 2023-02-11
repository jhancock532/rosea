import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import settings from "../data/settings.json";
import { SettingsProvider } from "context/settings";
import { EditorProvider } from "context/editor";
import { useImmer } from "use-immer";
import Header from "components/Header";
import Footer from "components/Footer";
import "../styles/globals.scss";

// From the Indian Font Foundry: https://www.fontshare.com/fonts/sentient
const sentient = localFont({ src: "./Sentient-Variable.ttf" });

function MyApp({ Component, pageProps }: AppProps) {
  const [editorContents, setEditorContents] = useImmer({ data: "" });
  const value = { editorContents, setEditorContents };

  return (
    <SettingsProvider settings={settings}>
      <EditorProvider data={value}>
        <style jsx global>{`
          html {
            font-family: ${sentient.style.fontFamily};
          }
        `}</style>
        <div className={"container"}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </EditorProvider>
    </SettingsProvider>
  );
}

export default MyApp;
