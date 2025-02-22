import * as core from "@actions/core";
import * as github from "@actions/github";
import { GitHub } from "@actions/github/lib/utils";

async function run() {
    const token = core.getInput("github-token", { required: true });
    const octokit = github.getOctokit(token);

    const labelNames = await getPullRequestLabelNames(octokit);


    const labels = getInputLabels();
    const matchedLabels = labels.filter(label => labelNames.includes(label));
    const result = labels.every(
        (label) => labelNames.findIndex((value) => label === value) >= 0
    );
    core.debug(`Labels Returned from PR: ${labels.toString()}`);
    core.debug(`Labels Passed: ${labels}`);
    core.debug(`Labels that were Matched: ${matchedLabels}`);

    core.setOutput("result", result);
    core.setOutput("allLabelsPresent", labelNames.toString());
    core.setOutput("allLabelsPassed", labels.toString());
    core.setOutput("matchedLabels", matchedLabels.toString());
}

async function getPullRequestLabelNames(
    octokit: InstanceType<typeof GitHub>
): Promise<string[]> {
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const commit_sha = github.context.sha;

    const response =
        await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
            owner,
            repo,
            commit_sha,
        });

    const pr = response.data.length > 0 && response.data[0];
    return pr ? pr.labels.map((label) => label.name || "") : [];
}

function getInputLabels(): string[] {
    const raw = core.getInput("labels", { required: true });
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : [];
}

run().catch((err) => {
    core.setFailed(err.message);
});
