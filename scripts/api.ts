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
}

export { getCommitHistory, getRootTreeFromMaster, getWebsiteData };
