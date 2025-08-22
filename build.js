#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get Vercel environment variables
const vercelEnv = process.env.VERCEL_ENV || 'development';
const vercelUrl = process.env.VERCEL_URL || '';
const vercelRegion = process.env.VERCEL_REGION || '';
const vercelGitCommitSha = process.env.VERCEL_GIT_COMMIT_SHA || '';
const vercelGitCommitRef = process.env.VERCEL_GIT_COMMIT_REF || '';

// Create environment info object
const envInfo = {
  VERCEL_ENV: vercelEnv,
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
console.log('Environment:', vercelEnv);
