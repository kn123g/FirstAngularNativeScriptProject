import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import {
    NativeScriptModule, NativeScriptFormsModule,
    NativeScriptCommonModule,
    NativeScriptHttpClientModule
} from '@nativescript/angular';
import {ReactiveFormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { EditchallengeComponent } from "./editChallenge/editChallenge.component";
import { ViewchallengeComponent } from "./viewChallenge/viewChallenge.component";
import { AuthComponent } from "./auth/auth.component";
import { TodayComponent } from "./today/today.component";
import { ActionbarComponent } from "./shared/ui/actionBar/actionBar.component";
import { EdittchallengeComponent } from "./editTChallenge/editTChallenge.component";
import { TabchallengeComponent } from "./tabChallenge/tabChallenge.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { CurrentchallengeComponent } from "./currentChallenge/currentchallenge.component"
import {TodayModalComponent} from "./TodayModal/TodayModal.component";
import{ChallangeActionComponent} from "./challengeAction/challenge.action.component";
import { AuthGuard } from './auth/auth.guard';
@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule, NativeScriptFormsModule,NativeScriptHttpClientModule,
       NativeScriptCommonModule, NativeScriptUISideDrawerModule,ReactiveFormsModule],
    declarations: [AppComponent,ChallangeActionComponent, AuthComponent, TabchallengeComponent, TodayComponent, EdittchallengeComponent, ActionbarComponent,
      EditchallengeComponent, ViewchallengeComponent, CurrentchallengeComponent,TodayModalComponent],
    providers: [AuthGuard],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents:[TodayModalComponent]
})
export class AppModule { }
