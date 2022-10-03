import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { commitWebsiteData, getWebsiteData } from "../scripts/api";
import styles from "../styles/Home.module.scss";

const WORKER_URL = "https://github-oauth-login.james-hancock6775.workers.dev";

const Admin: NextPage = () => {
  const [apiToken, setApiToken] = useState<string>("");
  const [loginStatus, setLoginStatus] =
    useState<"logged-out" | "logged-in">("logged-out");
  const [websiteData, setWebsiteData] = useState<string>("");

  useEffect(() => {
    const code = new URL(location.href).searchParams.get("code");

    if (code) {
      login(code);
    }
  }, []);

  useEffect(() => {
    if (apiToken.length > 0) {
      setLoginStatus("logged-in");
    }
  }, [apiToken]);

  async function login(code: string) {
    const path =
      location.pathname +
      location.search.replace(/\bcode=\w+/, "").replace(/\?$/, "");
    history.pushState({}, "", path);

    const response = await fetch(WORKER_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const result = await response.json();

    if (result.error) {
      return alert(JSON.stringify(result, null, 2));
    } else {
      setApiToken(result.token);
    }
  }

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
    <div className={styles.container}>
      <Head>
        <title>Admin</title>
        <meta
          name="description"
          content="A website integrated with the GitHub API."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Administrator View</h1>

        {loginStatus === "logged-out" ? (
          <>
            <p className={styles.description}>
              This page requires authentication to continue.
            </p>

            <p className={styles.login}>
              <a href="https://github-oauth-login.james-hancock6775.workers.dev">
                Login with Github OAuth
              </a>
            </p>
          </>
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
      </main>
    </div>
  );
};

export default Admin;
