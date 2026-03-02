import { Component, h, State } from "@stencil/core"
import { ThemeService, ThemeMode } from "../../services/theme"

@Component({
    tag: "theme-toggle",
    shadow: false,
})
export class ThemeToggle {
    @State() private isDarkMode = false

    private themeService = ThemeService.getInstance()

    async componentDidLoad() {
        await this.themeService.init()

        // Subscribe to theme changes
        this.themeService.subscribe((theme: ThemeMode) => {
            this.isDarkMode = theme === "dark"
        })

        // Set initial state
        this.isDarkMode = this.themeService.isDark()
    }

    private async toggleTheme() {
        await this.themeService.toggleTheme()
        this.isDarkMode = this.themeService.isDark()
    }

    public render() {
        return (
            <ion-button onClick={() => this.toggleTheme()} class="theme-toggle">
                <ion-icon
                    slot="icon-only"
                    name={this.isDarkMode ? "moon" : "sunny"}
                ></ion-icon>
            </ion-button>
        )
    }
}
