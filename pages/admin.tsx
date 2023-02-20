import { ChangeEvent, useEffect, useState } from "react";
import {
  commitFileToRepository,
  fetchFileFromRepository,
  loginToGitHub,
} from "../scripts/api";
import styles from "../components/Pages/Admin/Admin.module.scss";
import fs from "fs";
import { join } from "path";
import contentTypes from "../data/contentTypes.json";
import LoginScreen from "../components/LoginScreen";
import Button from "components/Button";
import TextEditor from "components/TextEditor";
import Editor from "components/Editor";
import { useEditorContext } from "context/editor";
import { Page } from "types/pages";

type AdminPageProps = {
  editablePages: {
    title: string;
    path: string;
  }[];
};

const Admin = ({ editablePages }: AdminPageProps) => {
  const [apiToken, setApiToken] = useState<string>("");
  const [loginStatus, setLoginStatus] =
    useState<"logged-out" | "logged-in">("logged-out");
  const [websiteData, setWebsiteData] = useState<string>("");
  const { editorContents, setEditorContents } = useEditorContext();

  const [postPath, setPostPath] = useState<string>("unset");

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
      const data = await fetchFileFromRepository(apiToken, postPath);
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
    <div className={styles.container}>
      <div className={styles.editorContainer}>
        <h1 className={styles.title}>Admin</h1>
        {loginStatus === "logged-out" ? (
          <LoginScreen />
        ) : (
          <>
            <p className={styles.description}>
              Welcome to Rosea admin, you&apos;ve successfully logged in. <br />
              Please select the page you&apos;d like to edit.
            </p>
            <select
              className={styles.postEditorSelect}
              value={postPath}
              onChange={(event) => {
                setPostPath(event.target.value);
              }}
            >
              <option value={"unset"}>------</option>
              {editablePages.map((page, index) => (
                <option value={page.path} key={index}>
                  {page.title}
                </option>
              ))}
            </select>
            {postPath !== "unset" && (
              <p className={styles.description}>
                You&apos;ve selected {postPath}
              </p>
            )}
            <Button variant="green" onClick={loadWebsiteData}>
              Load Website Data
            </Button>
            {websiteData && (
              <textarea
                className={styles.textArea}
                value={websiteData}
                onChange={updateWebsiteData}
                rows={5}
              />
            )}

            {/* <Button variant="red" onClick={handleCommitWebsiteData}>
              Commit Website Data
            </Button> */}

            <TextEditor setOutputHTML={setTextEditorContent} />
            <Editor configuration={contentTypes.page.homepage} />
          </>
        )}
      </div>
    </div>
  );
};

/* <div className={styles.previewContainer}>
    <HomePage data={websiteData ? JSON.parse(websiteData) : data} />
  </div> */

export default Admin;

const EDITABLE_DATA_PATH = join(process.cwd(), "data/pages");

// Recursively return all editable files from path using FS
function getAllFilePaths(rootPath: string): any {
  const paths = fs.readdirSync(rootPath);

  const editablePages = paths.map((path: string) => {
    const fullPostPath = join(rootPath, path);

    // check if fullPostPath ends with ".json"
    if (fullPostPath.includes(".json")) {
      const rawPostData = fs.readFileSync(fullPostPath, { encoding: "utf8" });
      const postJSON = JSON.parse(rawPostData) as Page;

      const postPathWithoutRoot = fullPostPath.replace(process.cwd(), "");

      return {
        title: postJSON.content.title,
        path: postPathWithoutRoot,
      };
    } else {
      return getAllFilePaths(fullPostPath);
    }
  });

  return editablePages.flat();
}

export const getStaticProps = async () => {
  const editablePages = getAllFilePaths(EDITABLE_DATA_PATH);

  return {
    props: {
      editablePages,
    },
  };
};
