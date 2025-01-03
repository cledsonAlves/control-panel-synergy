import { Octokit } from "@octokit/rest";

/**
 * Fetches release data from a specific GitHub issue using Octokit.
 * Replace `YOUR_PERSONAL_ACCESS_TOKEN` with a valid GitHub token.
 */
export const fetchReleasesFromGitHub = async () => {
  const octokit = new Octokit({ auth: `${process.env.GITHUB_GENERIC_TOKEN}` });
  const owner = "cledsonAlves";
  const repo = "control-panel-synergy";
  const issueNumber = 2;

  try {
    const { data: issue } = await octokit.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    });

    // Parse the body of the issue to extract releases (assumes JSON format in the issue body)
    const parsedReleases = JSON.parse(issue.body);

    console.log(parsedReleases);

    return parsedReleases;
  } catch (error) {
    console.error("Error fetching releases from GitHub:", error);
    throw error;
  }
};