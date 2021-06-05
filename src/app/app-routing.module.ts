import { NgModule } from '@angular/core'
import { Routes, Router } from '@angular/router';
//import { RouterExtensions } from '@nativescript/angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { AuthComponent } from "./auth/auth.component";
import { TodayComponent } from "./today/today.component";
import { EdittchallengeComponent } from "./editTChallenge/editTChallenge.component";
import { TabchallengeComponent } from "./tabChallenge/tabChallenge.component";
import { CurrentchallengeComponent } from "./currentChallenge/currentchallenge.component"
const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'auth', component: AuthComponent
    },
    {
        path: 'challenges',
        children: [
            {
                path: 'tabs', component: TabchallengeComponent,
                children: [
                    { path: 'today', component: TodayComponent, outlet: 'today' },
                    { path: 'editTodayChallenge', component: EdittchallengeComponent, outlet: 'today' },
                    { path: 'editTChallenge', component: EdittchallengeComponent, outlet: 'currentchallenge' },
                    { path: 'currentchallenge', component: CurrentchallengeComponent, outlet: 'currentchallenge' },
                ]
            },
            { path: ":mode", component: EdittchallengeComponent },
            // { path: "", redirectTo: "/challenges/tabs", pathMatch: "full" }
        ]
    },

]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
