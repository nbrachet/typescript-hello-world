#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get Vercel environment variables
const vercelEnv = process.env.VERCEL_ENV || 'development';
const vercelUrl = process.env.VERCEL_URL || '';
const vercelRegion = process.env.VERCEL_REGION || '';
const vercelGitCommitSha = process.env.VERCEL_GIT_COMMIT_SHA || '';
const vercelGitCommitRef = process.env.VERCEL_GIT_COMMIT_REF || '';

// Check for custom stage environment override
// This can be set as an environment variable or based on branch name
function determineEnvironment() {
  // Check for explicit STAGE environment variable
  if (process.env.STAGE) {
    return process.env.STAGE;
  }
  
  // Check if we're on a staging branch
  if (vercelGitCommitRef) {
    if (vercelGitCommitRef.includes('staging') || vercelGitCommitRef.includes('stage')) {
      return 'staging';
    }
    if (vercelGitCommitRef.includes('develop') || vercelGitCommitRef.includes('dev')) {
      return 'development';
    }
  }
  
  // Fall back to Vercel's environment detection
  return vercelEnv;
}

const environment = determineEnvironment();

// Create environment info object
const envInfo = {
  VERCEL_ENV: vercelEnv,
  DETERMINED_ENV: environment,
  VERCEL_URL: vercelUrl,
  VERCEL_REGION: vercelRegion,
  VERCEL_GIT_COMMIT_SHA: vercelGitCommitSha ? vercelGitCommitSha.substring(0, 7) : '',
  VERCEL_GIT_COMMIT_REF: vercelGitCommitRef,
  BUILD_TIME: new Date().toISOString()
};

// Create a JavaScript file with the environment info
const envJs = `// Auto-generated environment info
window.VERCEL_ENV_INFO = ${JSON.stringify(envInfo, null, 2)};
`;

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Write the environment file
fs.writeFileSync('public/env.js', envJs);

console.log('Environment info written to public/env.js');
console.log('Vercel Environment:', vercelEnv);
console.log('Determined Environment:', environment);
