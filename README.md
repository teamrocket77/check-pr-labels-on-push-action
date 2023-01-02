# Check PR Labels on Push Action

This action check if given labels have be applied to the PR when pushed. This is a fork with action being updated to node16

## Inputs

### `github-token`

**Required** The repository token, i.e. `secrets.GITHUB_TOKEN`

### `labels`

**Required** The array of label name, e.g. `'["label-1", "label-2"]'`

## Outputs

### `result`

The result if given labels have be applied to the PR

## Example Usage

```
uses: teamrocket77/check-pr-labels-on-push-action@v1.3
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  labels: '["label-1", "label-2"]'
```

### Example Workflow
e.g. [.github/workflows/main.yml](https://github.com/teamrocket77/check-pr-labels-on-push-action/blob/master/.github/workflows/main.yml)
```
on:
  workflow_dispatch:
  push:
    branches:
      - master

jobs:
    check_pr_labels_job:
        runs-on: ubuntu-latest
        name: A job to check the PR labels contain given labels
        steps:
            - name: Check PR labels action step
              id: check_pr_labels
              uses: teamrocket77/check-pr-labels-on-push-action@v1.3
              with:
                  github-token: ${{ secrets.GITHUB_TOKEN }}
                  labels: '["enhancement"]'
            - name: Inspect result
              run: echo "${{ steps.check_pr_labels.outputs.result }}"
            - name: Inspect allLabels
              run: echo "${{ steps.check_pr_labels.outputs.allLabels }}"
            - name: Inspect matchedLabels
              run: echo "${{ steps.check_pr_labels.outputs.matchedLabels }}"
```
