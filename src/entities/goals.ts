export interface DailyGoals {
    energy: number
    protein: number
    fat: number
    carbonhydrate: number
}

export const DEFAULT_GOALS: DailyGoals = {
    energy: 2000,
    protein: 50,
    fat: 70,
    carbonhydrate: 250,
}
