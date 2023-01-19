import type { NextPage } from "next";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import HomePage from "../components/Pages/HomePage";
import {
  commitFileToRepository,
  fetchFileFromRepository,
  loginToGitHub,
} from "../scripts/api";
import styles from "../components/Pages/Admin/Admin.module.scss";
import data from "../data/pages/index.json";
import contentTypes from "../data/contentTypes.json";
import LoginScreen from "../components/LoginScreen";
import Button from "components/Button";
import TextEditor from "components/TextEditor";
import Editor from "components/Editor";
import { useEditorContext } from "context/editor";

const Admin: NextPage = () => {
  const [apiToken, setApiToken] = useState<string>("");
  const [loginStatus, setLoginStatus] =
    useState<"logged-out" | "logged-in">("logged-out");
  const [websiteData, setWebsiteData] = useState<string>("");
  const { editorContents, setEditorContents } = useEditorContext();

  useEffect(() => {
    if (process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
      setApiToken(process.env.GITHUB_PERSONAL_ACCESS_TOKEN);
      setLoginStatus("logged-in");
      return;
    }

    const code = new URL(location.href).searchParams.get("code");

    async function login(code: string) {
      const token = await loginToGitHub(code);
      setApiToken(token);
    }

    if (code) {
      login(code);
    }
  }, []);

  useEffect(() => {
    if (apiToken.length > 0) {
      setLoginStatus("logged-in");
    }
  }, [apiToken]);

  const setTextEditorContent = (html: string) => {
    const data = JSON.parse(websiteData);
    data.content.richtext = html;
    setWebsiteData(JSON.stringify(data));
  };

  async function loadWebsiteData() {
    try {
      const data = await fetchFileFromRepository(
        apiToken,
        "data/pages/index.json"
      );
      setWebsiteData(data);
      setEditorContents((draft: any) => {
        draft.data = JSON.parse(data);
      });
    } catch {
      alert("Error loading website data.");
    }
  }

  async function handleCommitWebsiteData() {
    try {
      const response = await commitFileToRepository(
        apiToken,
        websiteData,
        "data/website.json"
      );
      console.log(response);
    } catch {
      alert("Error committing website data.");
    }
  }

  const updateWebsiteData = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWebsiteData(event.target.value);
  };

  return (
    <div className={styles.splitContainer}>
      <div className={styles.editorContainer}>
        {loginStatus === "logged-out" ? (
          <>
            <LoginScreen />
            <Editor configuration={contentTypes.page.homepage} />
          </>
        ) : (
          <>
            <p className={styles.description}>Successfully logged in.</p>
            <Button variant="green" onClick={() => loadWebsiteData()}>
              Load Website Data
            </Button>
            {websiteData && (
              <textarea
                className={styles.textEditor}
                value={websiteData}
                onChange={updateWebsiteData}
              />
            )}
            <Button variant="red" onClick={() => handleCommitWebsiteData()}>
              Commit Website Data
            </Button>
            <TextEditor setOutputHTML={setTextEditorContent} />
          </>
        )}
      </div>
      <div className={styles.previewContainer}>
        <HomePage data={websiteData ? JSON.parse(websiteData) : data} />
      </div>
    </div>
  );
};

export default Admin;
