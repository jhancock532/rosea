import "../styles/globals.scss";
import type { AppProps } from "next/app";
import settings from "../data/settings.json";
import { SettingsProvider } from "context/settings";
import { EditorProvider } from "context/editor";
import { useImmer } from "use-immer";

function MyApp({ Component, pageProps }: AppProps) {
  const [editorContents, setEditorContents] = useImmer({ data: "" });
  const value = { editorContents, setEditorContents };

  return (
    <SettingsProvider settings={settings}>
      <EditorProvider data={value}>
        <Component {...pageProps} />
      </EditorProvider>
    </SettingsProvider>
  );
}

export default MyApp;
