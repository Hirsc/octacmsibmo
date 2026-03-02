import { Component, h, State } from "@stencil/core"
import { toastError } from "../toasts/error"
import { toastSuccess } from "../toasts/success"
import { getErrorMessage, hasValidationErrors, validateGoalsInput } from "../../utils/goals-validation"
import { GoalsService } from "../../services/goals"
import type { DailyGoals } from "../../entities/goals"

@Component({
    styleUrl: "index.css",
    tag: "goals-settings",
})
export class GoalsSettings {
    @State() public goals: DailyGoals = {
        energy: 2000,
        protein: 50,
        fat: 70,
        carbonhydrate: 250,
    }
    @State() public isLoading = true

    private goalsService = GoalsService.getInstance()

    async componentDidLoad() {
        const [goals, error] = await this.goalsService.getGoals()

        if (error) {
            toastError("Failed to load goals. Using defaults.")
            return
        }

        if (goals) {
            this.goals = goals
        }

        this.isLoading = false
    }

    public render(): Element[] {
        if (this.isLoading) {
            return [
                <ion-header translucent={true}>
                    <ion-toolbar color="primary">
                        <ion-buttons slot="start">
                            <ion-back-button defaultHref="/" />
                        </ion-buttons>
                        <ion-title>Daily Goals</ion-title>
                    </ion-toolbar>
                </ion-header>,
                <ion-content class="ion-padding">
                    <p>Loading goals...</p>
                </ion-content>,
            ]
        }

        return [
            <ion-header translucent={true}>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>Daily Goals</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content>
                <form onSubmit={(e) => this.handleSubmit(e)} novalidate>
                    <ion-list lines="full" class="ion-no-margin ion-no-padding">
                        <ion-list-header>
                            <ion-label>
                                <h2>Set Your Daily Targets</h2>
                                <p>Adjust these values based on your nutritional needs</p>
                            </ion-label>
                        </ion-list-header>

                        <ion-item>
                            <ion-label position="stacked">Energy (kcal) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="500"
                                max="10000"
                                value={this.goals.energy}
                                onInput={this.changeFormValue("energy")}
                            />
                            <ion-note slot="helper">Recommended: 1200-3000 kcal/day</ion-note>
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">Protein (g) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="10"
                                max="300"
                                value={this.goals.protein}
                                onInput={this.changeFormValue("protein")}
                            />
                            <ion-note slot="helper">Recommended: 50-150g/day</ion-note>
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">Fat (g) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="10"
                                max="200"
                                value={this.goals.fat}
                                onInput={this.changeFormValue("fat")}
                            />
                            <ion-note slot="helper">Recommended: 40-100g/day</ion-note>
                        </ion-item>

                        <ion-item>
                            <ion-label position="stacked">Carbohydrates (g) <ion-text color="danger">*</ion-text></ion-label>
                            <ion-input
                                required
                                type="number"
                                min="50"
                                max="500"
                                value={this.goals.carbonhydrate}
                                onInput={this.changeFormValue("carbonhydrate")}
                            />
                            <ion-note slot="helper">Recommended: 150-350g/day</ion-note>
                        </ion-item>
                    </ion-list>

                    <div class="ion-padding">
                        <ion-button
                            expand="block"
                            type="submit"
                            class="ion-no-margin"
                        >
                            Save Goals
                        </ion-button>

                        <ion-button
                            expand="block"
                            fill="outline"
                            class="ion-no-margin ion-margin-top"
                            onClick={() => this.resetToDefaults()}
                        >
                            Reset to Defaults
                        </ion-button>
                    </div>
                </form>
            </ion-content>,
        ]
    }

    private async handleSubmit(e: Event) {
        e.preventDefault()

        const validationErrors = validateGoalsInput(this.goals)

        if (hasValidationErrors(validationErrors)) {
            toastError(getErrorMessage(validationErrors))
            return
        }

        const [, error] = await this.goalsService.setGoals(this.goals)

        if (error) {
            toastError("Failed to save goals. Please try again.")
            return
        }

        toastSuccess("Daily goals saved successfully!")
        window.history.back()
    }

    private async resetToDefaults() {
        const [, error] = await this.goalsService.resetGoals()

        if (error) {
            toastError("Failed to reset goals. Please try again.")
            return
        }

        // Reload defaults
        const [goals] = await this.goalsService.getGoals()
        if (goals) {
            this.goals = goals
        }

        toastSuccess("Goals reset to defaults")
    }

    private changeFormValue(path: string) {
        return (e: any) => {
            this.goals = {
                ...this.goals,
                [path]: parseFloat(e.target.value) || 0,
            }
        }
    }
}
