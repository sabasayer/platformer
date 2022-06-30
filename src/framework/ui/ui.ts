const { createApp } = Vue;
declare const Vue: any;

class UI {
    app: any = null;
    constructor() {}

    render(component: any) {
        this.unmount();
        const app = createApp(component);
        this.app = app;
        app.mount("#app");
        this.showContainer();
    }

    unmount() {
        this.hideContainer();
        this.app?.unmount();
    }

    private showContainer() {
        this.findContainer().style.display = "block";
    }

    private hideContainer() {
        this.findContainer().style.display = "none";
    }

    private findContainer(): HTMLElement {
        const app = document.getElementById("app");
        if (!app) throw new Error("ui container is not found");

        return app;
    }
}

export const ui = new UI();
