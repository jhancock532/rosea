async function getCommitHistory(apiToken: string) {
  const commitHistoryResponse = await fetch(
    "https://api.github.com/repos/jhancock532/rosea/commits",
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
    }
  );

  const commitHistory = await commitHistoryResponse.json();

  if (commitHistory.error) {
    return alert(JSON.stringify(commitHistory, null, 2));
  }

  console.log(commitHistory);

  const processedCommits = commitHistory.map((commit: any) => {
    return {
      url: commit.html_url,
      message: commit.commit.message,
      author: commit.commit.author.name,
      sha: commit.sha,
    };
  });

  return processedCommits;
}

async function getRootTreeFromMaster(apiToken: string) {
  // /branches/master
  const latestMasterBranch = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/branches/master`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
    }
  );

  const masterBranch = await latestMasterBranch.json();

  if (masterBranch.error) {
    return alert(JSON.stringify(masterBranch, null, 2));
  }

  console.log(masterBranch);

  const rootTreeResponse = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/trees/${masterBranch.commit.sha}`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
    }
  );

  const rootTree = await rootTreeResponse.json();

  console.log(rootTree);
  return rootTree;
}

async function fetchFileFromRepository(apiToken: string, filePath: string) {
  const fetchURL = `https://api.github.com/repos/jhancock532/rosea/contents/${filePath}`;

  const fileResponse = await fetch(fetchURL, {
    headers: {
      accept: "application/vnd.github.v3+json",
      authorization: `token ${apiToken}`,
    },
  });

  const file = await fileResponse.json();
  console.log(file);

  return atob(file.content);
}

/**
 * Commits a file to the master branch of the current repository
 * @param apiToken GitHub access token
 * @param data JSON to be stored
 * @param path File path to be overwritten "data/website.json"
 * @returns `success` if commit succeeded
 */
async function commitFileToRepository(
  apiToken: string,
  data: string,
  path: string
) {
  /*
   1. Get master branch reference
   2. Get the tree SHA from the latest commit on master
   3. Create a new blob with the updated file data 
   4. Create a new tree referencing the blob SHA
   5. Create a new commit with the new tree SHA
   6. Update the master branch reference to point to the new commit SHA
  */

  const masterReference = (
    await fetch(
      `https://api.github.com/repos/jhancock532/rosea/git/matching-refs/heads/master`,
      {
        headers: {
          accept: "application/vnd.github.v3+json",
          authorization: `token ${apiToken}`,
        },
      }
    ).then((res) => res.json())
  )[0];

  const latestCommit = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/commits/${masterReference.object.sha}`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
    }
  ).then((res) => res.json());

  const createNewBlob = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/blobs`,
    {
      method: "POST",
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data }),
    }
  ).then((res) => res.json());

  const createNewTree = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/trees`,
    {
      method: "POST",
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
      body: JSON.stringify({
        base_tree: latestCommit.tree.sha,
        tree: [
          {
            path,
            mode: "100644", //The file mode, 100644 represents a blob
            type: "blob",
            sha: createNewBlob.sha,
          },
        ],
      }),
    }
  ).then((res) => res.json());

  const currentTime = new Date().toLocaleString();

  const createNewCommit = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/commits`,
    {
      method: "POST",
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
      body: JSON.stringify({
        message: `Automated commit from live website: ${currentTime}`,
        parents: [latestCommit.sha],
        tree: createNewTree.sha,
      }),
    }
  ).then((res) => res.json());

  const updateTheMasterReference = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/refs/heads/master`,
    {
      method: "PATCH",
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
      body: JSON.stringify({
        sha: createNewCommit.sha,
      }),
    }
  ).then((res) => res.json());

  return "success";
}

const WORKER_URL = "https://github-oauth-login.james-hancock6775.workers.dev";

async function loginToGitHub(code: string) {
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
    return result.token;
  }
}

export {
  getCommitHistory,
  getRootTreeFromMaster,
  fetchFileFromRepository,
  commitFileToRepository,
  loginToGitHub,
};
