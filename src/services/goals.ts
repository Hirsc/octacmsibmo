import { StorageService } from "./storage"
import type { DailyGoals } from "../entities/goals"
import { DEFAULT_GOALS } from "../entities/goals"

const GOALS_STORAGE_KEY = "daily_goals"

export class GoalsService {
    private static instance: GoalsService
    private storageService: StorageService<string>

    private constructor() {
        this.storageService = new StorageService<string>()
    }

    public static getInstance(): GoalsService {
        if (!GoalsService.instance) {
            GoalsService.instance = new GoalsService()
        }
        return GoalsService.instance
    }

    public async getGoals(): Promise<[DailyGoals?, Error?]> {
        try {
            const goalsData = await this.storageService.get(GOALS_STORAGE_KEY)

            if (!goalsData) {
                return [DEFAULT_GOALS]
            }

            const goals: DailyGoals = JSON.parse(goalsData)
            return [goals]
        } catch (error) {
            console.error("Failed to get goals:", error)
            return [, error]
        }
    }

    public async setGoals(goals: DailyGoals): Promise<[void?, Error?]> {
        try {
            const goalsData = JSON.stringify(goals)
            await this.storageService.set(GOALS_STORAGE_KEY, goalsData)
            return []
        } catch (error) {
            console.error("Failed to set goals:", error)
            return [, error]
        }
    }

    public async resetGoals(): Promise<[void?, Error?]> {
        return this.setGoals(DEFAULT_GOALS)
    }
}
