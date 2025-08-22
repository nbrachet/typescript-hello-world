// Main TypeScript application entry point

interface AppConfig {
    message: string;
    elementId: string;
}

interface VercelEnvironment {
    environment: string;
    region?: string;
    url?: string;
    commitSha?: string;
    commitRef?: string;
    buildTime?: string;
}


class HelloWorldApp {
    private config: AppConfig;

    constructor(config: AppConfig) {
        this.config = config;
    }

    private getVercelEnvironment(): VercelEnvironment {
        // Check if we have injected environment info from the build process
        if (window.VERCEL_ENV_INFO) {
            const envInfo = window.VERCEL_ENV_INFO;
            return {
                environment: envInfo.DETERMINED_ENV || envInfo.VERCEL_ENV || 'unknown',
                url: envInfo.VERCEL_URL ? `https://${envInfo.VERCEL_URL}` : window.location.origin,
                region: envInfo.VERCEL_REGION || undefined,
                commitSha: envInfo.VERCEL_GIT_COMMIT_SHA || undefined,
                commitRef: envInfo.VERCEL_GIT_COMMIT_REF || undefined,
                buildTime: envInfo.BUILD_TIME || undefined
            };
        }
        
        // Fallback: Check if we're running on Vercel by looking at the hostname
        const isVercel = window.location.hostname.includes('vercel.app') || 
                        window.location.hostname.includes('vercel.dev') ||
                        window.location.hostname.includes('now.sh');
        
        if (isVercel) {
            // Determine environment based on URL patterns
            const hostname = window.location.hostname;
            let environment = 'production';
            
            if (hostname.includes('git-') || hostname.includes('branch-')) {
                environment = 'preview';
            }
            
            return {
                environment,
                url: window.location.origin,
                region: 'Vercel Global Edge Network'
            };
        } else {
            return {
                environment: 'development',
                url: window.location.origin
            };
        }
    }

    private formatEnvironmentInfo(env: VercelEnvironment): string {
        let info = `<p><strong>Environment:</strong> <span style="color: ${this.getEnvironmentColor(env.environment)};">${env.environment.toUpperCase()}</span></p>`;
        info += `<p><strong>URL:</strong> <a href="${env.url}" target="_blank">${env.url}</a></p>`;
        
        if (env.region) {
            info += `<p><strong>Region:</strong> ${env.region}</p>`;
        }
        
        if (env.commitSha) {
            info += `<p><strong>Commit:</strong> ${env.commitSha}</p>`;
        }
        
        if (env.commitRef) {
            info += `<p><strong>Branch:</strong> ${env.commitRef}</p>`;
        }
        
        if (env.buildTime) {
            const buildDate = new Date(env.buildTime);
            info += `<p><strong>Built:</strong> ${buildDate.toLocaleString()}</p>`;
        }
        
        return info;
    }
    
    private getEnvironmentColor(environment: string): string {
        switch (environment.toLowerCase()) {
            case 'production':
                return '#22c55e'; // green
            case 'staging':
            case 'stage':
                return '#8b5cf6'; // purple
            case 'preview':
                return '#f59e0b'; // orange
            case 'development':
                return '#3b82f6'; // blue
            default:
                return '#6b7280'; // gray
        }
    }

    public render(): void {
        const appElement = document.getElementById(this.config.elementId);
        const vercelEnv = this.getVercelEnvironment();
        
        if (appElement) {
            appElement.innerHTML = `
                <h1>${this.config.message}</h1>
                <p>This page is powered by TypeScript!</p>
                <p>Current time: ${new Date().toLocaleString()}</p>
                <hr style="margin: 2rem 0; border: none; border-top: 1px solid #ddd;">
                <div style="text-align: left; background-color: #f8f9fa; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                    <h3 style="margin-top: 0; color: #333;">Deployment Info</h3>
                    ${this.formatEnvironmentInfo(vercelEnv)}
                </div>
            `;
        } else {
            console.error(`Element with id '${this.config.elementId}' not found`);
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new HelloWorldApp({
        message: 'Hello World',
        elementId: 'app'
    });
    
    app.render();
    console.log('TypeScript Hello World app initialized successfully!');
});
