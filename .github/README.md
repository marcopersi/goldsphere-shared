# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the goldsphere-shared package.

## Workflows

### 🔨 CI (`ci.yml`)
**Triggers:** Push to `main`/`develop`, Pull requests to `main`/`develop`

**What it does:**
- Tests the package on multiple Node.js versions (18.x, 20.x, 22.x)
- Runs linting (`npm run lint`)
- Runs type checking (`npm run type-check`) 
- Builds the package (`npm run build`)
- Verifies build artifacts exist
- Tests package publishing with dry run
- Verifies package contents

**Matrix Strategy:** Tests across Node.js 18, 20, and 22 to ensure compatibility.

### 📦 Publish (`publish.yml`)
**Triggers:** When a GitHub release is published

**What it does:**
- Runs full CI pipeline (lint, type-check, build)
- Publishes to npm registry (requires `NPM_TOKEN` secret)
- Publishes to GitHub Packages registry (uses `GITHUB_TOKEN`)

**Prerequisites:**
- `NPM_TOKEN` secret must be configured in repository settings
- Package version should be updated before creating release

### 🔒 Security & Dependencies (`security.yml`)
**Triggers:** 
- Weekly schedule (Mondays at 9 AM UTC)
- Push to `main`
- Pull requests to `main`

**What it does:**
- Runs `npm audit` to check for security vulnerabilities
- Checks for outdated dependencies
- Reviews dependency changes in PRs (GitHub Dependency Review)

## Setup Instructions

### 1. Configure Repository Secrets

For publishing to work, add these secrets in your GitHub repository settings:

```
NPM_TOKEN - Your npm authentication token
```

To get an npm token:
1. Go to [npmjs.com](https://www.npmjs.com/)
2. Login to your account
3. Go to Access Tokens in your profile
4. Generate a new token with "Automation" type
5. Add it as a repository secret

### 2. Enable GitHub Packages (Optional)

The publish workflow also publishes to GitHub Packages. This is optional and will use the `GITHUB_TOKEN` automatically provided by GitHub Actions.

### 3. Branch Protection Rules (Recommended)

Set up branch protection rules for `main`:
1. Require status checks to pass before merging
2. Require branches to be up to date before merging
3. Include these status checks:
   - `test (18.x)`
   - `test (20.x)` 
   - `test (22.x)`
   - `publish-check`
   - `security-audit`

## Workflow Status Badges

Add these badges to your main README.md:

```markdown
[![CI](https://github.com/marcopersi/goldsphere-shared/actions/workflows/ci.yml/badge.svg)](https://github.com/marcopersi/goldsphere-shared/actions/workflows/ci.yml)
[![Security](https://github.com/marcopersi/goldsphere-shared/actions/workflows/security.yml/badge.svg)](https://github.com/marcopersi/goldsphere-shared/actions/workflows/security.yml)
```

## Local Development

To run the same checks locally before pushing:

```bash
# Install dependencies
npm ci

# Run all checks (same as CI)
npm run lint
npm run type-check  
npm run build

# Check what would be published
npm pack --dry-run

# Security audit
npm audit
```

## Troubleshooting

### Failed npm audit
If `npm audit` fails, review the vulnerabilities:
```bash
npm audit --audit-level=moderate
npm audit fix  # To automatically fix if possible
```

### Failed type checking
Make sure TypeScript configuration is correct:
```bash
npm run type-check
# Review any type errors in the output
```

### Failed build
Check for compilation errors:
```bash
npm run build
# Review compiler output for errors
```
