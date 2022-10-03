import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  getCommitHistory,
  getRootTreeFromMaster,
  getWebsiteData,
} from "../scripts/api";
import styles from "../styles/Home.module.scss";
import { Commit } from "../types/api";

const WORKER_URL = "https://github-oauth-login.james-hancock6775.workers.dev";

const Admin: NextPage = () => {
  const [apiToken, setApiToken] = useState<string>("");
  const [commits, setCommits] = useState<Commit[]>([]);
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

  async function loadCommitHistory() {
    try {
      const commits = await getCommitHistory(apiToken);
      setCommits(commits);
    } catch {
      alert("Error loading commits.");
    }
  }

  async function loadRepositoryTree() {
    try {
      const tree = await getRootTreeFromMaster(apiToken);
      console.log(tree);
    } catch {
      alert("Error loading tree.");
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

  const renderedCommits = commits.splice(0, 3).map((commit) => (
    <div key={commit.sha}>
      <p>
        <a href={commit.url}>{commit.message}</a>
      </p>
      <p>By {commit.author}</p>
      <small>{commit.sha}</small>
    </div>
  ));

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
            <p>{apiToken}</p>
            <button onClick={() => loadCommitHistory()}>
              Load Commit History
            </button>
            {commits.length > 0 && renderedCommits}
            <button onClick={() => loadRepositoryTree()}>
              Load Current Repository Tree
            </button>
            <button onClick={() => loadWebsiteData()}>
              Load Current Repository Tree
            </button>
            {websiteData && <code>{websiteData}</code>}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
