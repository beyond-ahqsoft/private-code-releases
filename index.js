const { writeFileSync } = require("fs");

/**
 * Make Release File
 * @param {import("octokit").Octokit} context
 * @param {string} r_id
 */
module.exports = async (context, owner, repo, release_id) => {
  const { data: releaseData } = await context.rest.repos.getRelease({
    owner,
    repo,
    release_id,
  });

  const url = releaseData.assets.find(
    ({ name }) => name == "latest.json"
  ).browser_download_url;

  const words = await fetch(url).then((resp) => resp.text());
  writeFileSync("./latest.json", words);
};
