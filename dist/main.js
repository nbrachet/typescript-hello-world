"use strict";
// Main TypeScript application entry point
class HelloWorldApp {
    constructor(config) {
        this.config = config;
    }
    render() {
        const appElement = document.getElementById(this.config.elementId);
        if (appElement) {
            appElement.innerHTML = `
                <h1>${this.config.message}</h1>
                <p>This page is powered by TypeScript!</p>
                <p>Current time: ${new Date().toLocaleString()}</p>
            `;
        }
        else {
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
//# sourceMappingURL=main.js.map