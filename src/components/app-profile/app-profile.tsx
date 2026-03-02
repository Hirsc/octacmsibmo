import { Component, h, Prop } from "@stencil/core"

@Component(
    {
        styleUrl: "app-profile.css",
        tag: "app-profile",
    },
)
export class AppProfile {
    @Prop() public name: string

    private title = "Profile"

    public render(): Element[] {
        return [
            <ion-header translucent={true}>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button
                            defaultHref="/"
                        />
                    </ion-buttons>
                    <ion-title>{this.title}</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content>
                <div class="profile-container">
                    <ion-card>
                        <ion-card-header>
                            <ion-card-subtitle>User Profile</ion-card-subtitle>
                            <ion-card-title>{this.name}</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <p>Welcome to your personal calorie tracking profile!</p>
                            <p>More profile features and settings coming soon.</p>
                        </ion-card-content>
                    </ion-card>

                    <ion-list lines="inset">
                        <ion-list-header>
                            <ion-label>Quick Stats</ion-label>
                        </ion-list-header>
                        <ion-item>
                            <ion-label>
                                <h3>Tracking Days</h3>
                                <p>Keep logging your daily food intake</p>
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                <h3>Goals</h3>
                                <p>Daily calorie and macro targets</p>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                </div>
            </ion-content>,
        ]
    }
}
