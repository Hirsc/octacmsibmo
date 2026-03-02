import { StorageService } from "./storage"

const THEME_STORAGE_KEY = "app_theme"

export type ThemeMode = "light" | "dark"

export class ThemeService {
    private static instance: ThemeService
    private storageService: StorageService<string>
    private currentTheme: ThemeMode = "light"
    private listeners: Set<(theme: ThemeMode) => void> = new Set()

    private constructor() {
        this.storageService = new StorageService<string>()
    }

    public static getInstance(): ThemeService {
        if (!ThemeService.instance) {
            ThemeService.instance = new ThemeService()
        }
        return ThemeService.instance
    }

    public async init(): Promise<void> {
        try {
            const savedTheme = await this.storageService.get(THEME_STORAGE_KEY)
            if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
                this.currentTheme = savedTheme
            } else {
                // Check system preference
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                this.currentTheme = prefersDark ? "dark" : "light"
            }
            this.applyTheme(this.currentTheme)
        } catch (error) {
            console.error("Failed to initialize theme:", error)
        }
    }

    public async setTheme(theme: ThemeMode): Promise<void> {
        this.currentTheme = theme
        await this.storageService.set(THEME_STORAGE_KEY, theme)
        this.applyTheme(theme)
        this.notifyListeners(theme)
    }

    public getTheme(): ThemeMode {
        return this.currentTheme
    }

    public async toggleTheme(): Promise<void> {
        const newTheme = this.currentTheme === "light" ? "dark" : "light"
        await this.setTheme(newTheme)
    }

    public subscribe(callback: (theme: ThemeMode) => void): () => void {
        this.listeners.add(callback)
        // Immediately call with current theme
        callback(this.currentTheme)

        // Return unsubscribe function
        return () => {
            this.listeners.delete(callback)
        }
    }

    private applyTheme(theme: ThemeMode): void {
        if (theme === "dark") {
            document.body.classList.add("dark-theme")
            document.body.setAttribute("color-theme", "dark")
        } else {
            document.body.classList.remove("dark-theme")
            document.body.setAttribute("color-theme", "light")
        }
    }

    private notifyListeners(theme: ThemeMode): void {
        this.listeners.forEach(callback => callback(theme))
    }

    public isDark(): boolean {
        return this.currentTheme === "dark"
    }
}
