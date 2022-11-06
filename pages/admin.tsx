import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import HomePage from "../components/Pages/HomePage";
import {
  commitFileToRepository,
  fetchFileFromRepository,
  loginToGitHub,
} from "../scripts/api";
import styles from "../components/Pages/Admin/Admin.module.scss";
import data from "../data/website.json";
import LoginScreen from "../components/LoginScreen";
import Button from "components/Button";
import TextEditor from "components/TextEditor";

const Admin: NextPage = () => {
  const [apiToken, setApiToken] = useState<string>("");
  const [loginStatus, setLoginStatus] =
    useState<"logged-out" | "logged-in">("logged-out");
  const [websiteData, setWebsiteData] = useState<string>("");

  useEffect(() => {
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

  const setEditorContent = (html: string) => {
    const data = JSON.parse(websiteData);
    data.content.richtext = html;
    setWebsiteData(JSON.stringify(data));
  };

  async function loadWebsiteData() {
    try {
      const data = await fetchFileFromRepository(apiToken);
      setWebsiteData(data);
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
          <LoginScreen />
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
            <TextEditor setOutputHTML={setEditorContent} />
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
