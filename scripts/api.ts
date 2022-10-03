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

async function getWebsiteData(apiToken: string) {
  const rootTree = await getRootTreeFromMaster(apiToken);
  const dataTreeInformation = rootTree.tree.find(
    (tree: any) => tree.path === "data"
  );

  const dataTreeResponse = await fetch(dataTreeInformation.url, {
    headers: {
      accept: "application/vnd.github.v3+json",
      authorization: `token ${apiToken}`,
    },
  });

  const dataTree = await dataTreeResponse.json();
  console.log(dataTree);

  const websiteDataInformation = dataTree.tree.find(
    (tree: any) => tree.path === "website.json"
  );

  const websiteDataResponse = await fetch(websiteDataInformation.url, {
    headers: {
      accept: "application/vnd.github.v3+json",
      authorization: `token ${apiToken}`,
    },
  });
  const websiteData = await websiteDataResponse.json();

  return atob(websiteData.content);
}

async function commitWebsiteData(apiToken: string, websiteData: string) {
  // Create a blob with the new website data, send this to the repository.
  // Create a tree with the above blob sha (based on the equivalent master tree?)
  // Create a commit with the tree
  // Update the reference on master to the new commit (default is force push)

  const masterHeadReferenceResponse = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/matching-refs/heads/master`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
    }
  );

  const masterReference = await masterHeadReferenceResponse.json();
  console.log(masterReference);
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
  getWebsiteData,
  commitWebsiteData,
  loginToGitHub,
};
