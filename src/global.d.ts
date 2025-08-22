// Global type definitions

declare global {
    interface Window {
        VERCEL_ENV_INFO?: {
            VERCEL_ENV: string;
            DETERMINED_ENV: string;
            VERCEL_URL: string;
            VERCEL_REGION: string;
            VERCEL_GIT_COMMIT_SHA: string;
            VERCEL_GIT_COMMIT_REF: string;
            BUILD_TIME: string;
        };
    }
}

export {};
