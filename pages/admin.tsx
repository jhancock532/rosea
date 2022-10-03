import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import HomePage from "../components/Pages";
import {
  commitWebsiteData,
  getWebsiteData,
  loginToGitHub,
} from "../scripts/api";
import styles from "../styles/Admin.module.scss";
import data from "../data/website.json";
import LoginScreen from "../components/LoginScreen";

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

  async function loadWebsiteData() {
    try {
      const data = await getWebsiteData(apiToken);
      setWebsiteData(data);
    } catch {
      alert("Error loading website data.");
    }
  }

  async function handleCommitWebsiteData() {
    try {
      const response = await commitWebsiteData(apiToken, websiteData);
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
            <button className={styles.button} onClick={() => loadWebsiteData()}>
              Load Website Data
            </button>
            {websiteData && (
              <textarea
                className={styles.textEditor}
                value={websiteData}
                onChange={updateWebsiteData}
              />
            )}
            <button
              className={styles.button}
              onClick={() => handleCommitWebsiteData()}
            >
              Commit Website Data
            </button>
          </>
        )}
      </div>
      <div className={styles.previewContainer}>
        <HomePage data={data} />
      </div>
    </div>
  );
};

export default Admin;
