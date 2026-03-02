import { Component, h, Prop, State } from "@stencil/core"

import type { DayMacros } from "../../entities/food"
import type { DailyGoals } from "../../entities/goals"

import type { GetTrackedMacrosOfADay, RemoveFoodFromDay } from "./service/interface"
import { GoalsService } from "../../services/goals"


export interface FoodService extends GetTrackedMacrosOfADay, RemoveFoodFromDay {}

@Component(
    {
        styleUrl: "index.css",
        tag: "current-day-macros",
    },
)
export class CurrentDayMacros {
    @State() public dayMacros: DayMacros = {} as DayMacros
    @State() public goals: DailyGoals = { energy: 2000, protein: 50, fat: 70, carbonhydrate: 250 }
    @State() public error: Error
    @State() public isLoading = true
    @Prop() public service: FoodService
    @Prop() public dayMonthYear: string

    private goalsService = GoalsService.getInstance()

    async componentDidLoad() {
        await this.loadData()

        const router = document.querySelector("ion-router")
        router.addEventListener("ionRouteDidChange", async () => {
            await this.loadData()
        })
    }

    private async loadData() {
        try {
            // Load goals
            const [goals] = await this.goalsService.getGoals()
            if (goals) {
                this.goals = goals
            }

            // Load daily macros
            const [dayMacros, macrosError] = await this.service.getTrackedMacrosOfADay(this.dayMonthYear)
            if (dayMacros) {
                this.dayMacros = dayMacros
            }

            if (macrosError) {
                this.error = macrosError
            }

            this.isLoading = false
        } catch (error) {
            console.error("Failed to load data:", error)
            this.isLoading = false
        }
    }

    private getProgressPercentage(current: number, goal: number): number {
        if (!goal || goal <= 0) return 0
        const percentage = Math.min((current / goal) * 100, 100)
        return Math.round(percentage * 10) / 10 // Round to 1 decimal place
    }

    private getProgressColor(percentage: number): string {
        if (percentage >= 100) return "success"
        if (percentage >= 80) return "warning"
        return "medium"
    }

    public render(): Element[] {
        if (this.isLoading) {
            return [
                <ion-content class="ion-padding">
                    <p>Loading progress...</p>
                </ion-content>,
            ]
        }

        const energyPercentage = this.getProgressPercentage(this.dayMacros.energy || 0, this.goals.energy)
        const proteinPercentage = this.getProgressPercentage(this.dayMacros.protein || 0, this.goals.protein)
        const fatPercentage = this.getProgressPercentage(this.dayMacros.fat || 0, this.goals.fat)
        const carbsPercentage = this.getProgressPercentage(this.dayMacros.carbonhydrate || 0, this.goals.carbonhydrate)

        return [
            <ion-content>
                <ion-card>
                    <ion-card-header>
                        <ion-card-subtitle>Daily Progress</ion-card-subtitle>
                        <ion-card-title>Today's Macros</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        {/* Energy Progress */}
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Energy</span>
                                <span>{this.dayMacros.energy || 0} / {this.goals.energy} kcal</span>
                            </div>
                            <ion-progress-bar
                                value={energyPercentage / 100}
                                color={this.getProgressColor(energyPercentage)}
                            ></ion-progress-bar>
                            <div class="progress-percentage">{energyPercentage}%</div>
                        </div>

                        {/* Protein Progress */}
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Protein</span>
                                <span>{this.dayMacros.protein || 0} / {this.goals.protein}g</span>
                            </div>
                            <ion-progress-bar
                                value={proteinPercentage / 100}
                                color={this.getProgressColor(proteinPercentage)}
                            ></ion-progress-bar>
                            <div class="progress-percentage">{proteinPercentage}%</div>
                        </div>

                        {/* Fat Progress */}
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Fat</span>
                                <span>{this.dayMacros.fat || 0} / {this.goals.fat}g</span>
                            </div>
                            <ion-progress-bar
                                value={fatPercentage / 100}
                                color={this.getProgressColor(fatPercentage)}
                            ></ion-progress-bar>
                            <div class="progress-percentage">{fatPercentage}%</div>
                        </div>

                        {/* Carbohydrates Progress */}
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Carbs</span>
                                <span>{this.dayMacros.carbonhydrate || 0} / {this.goals.carbonhydrate}g</span>
                            </div>
                            <ion-progress-bar
                                value={carbsPercentage / 100}
                                color={this.getProgressColor(carbsPercentage)}
                            ></ion-progress-bar>
                            <div class="progress-percentage">{carbsPercentage}%</div>
                        </div>
                    </ion-card-content>
                </ion-card>
            </ion-content>,
        ]
    }
}


