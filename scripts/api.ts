import { Commit } from "../types/api";

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

async function getTreeFromCommit(apiToken: string, commit: Commit) {
  const latestCommitResponse = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/commits/${commit.sha}`,
    {
      headers: {
        accept: "application/vnd.github.v3+json",
        authorization: `token ${apiToken}`,
      },
    }
  );

  const latestCommit = await latestCommitResponse.json();

  if (latestCommit.error) {
    return alert(JSON.stringify(latestCommit, null, 2));
  }

  const rootTreeResponse = await fetch(
    `https://api.github.com/repos/jhancock532/rosea/git/trees/${latestCommit.tree.sha}?recursive=yes`,
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

export { getCommitHistory, getTreeFromCommit };
