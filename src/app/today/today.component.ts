import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import { ChallengeService } from "../challenge/challenge.service";
import { Day, DayStatus } from "../challenge/day.model";
import { Subscription } from "rxjs";

@Component({
	selector: "Today",
	moduleId: module.id,
	templateUrl: "./today.component.html",
	styleUrls: ['./today.component.scss']
})

export class TodayComponent implements OnInit,OnDestroy {

	shouldShowBackButton: boolean = false;
  currentChallengeSub : Subscription;
  currentDay : Day;
	constructor(private router: RouterExtensions, private active: ActivatedRoute,
    private challengeService : ChallengeService) { }
	ngOnInit(): void {
		if (this.router.canGoBack()) {
			this.shouldShowBackButton = true;
		}
    this.currentChallengeSub= this.challengeService.currentChallenge.subscribe(challenge=>{
      if(challenge){
        this.currentDay = challenge.currentDay;
      }
    });

	}
	onActionTap(action : DayStatus) {
    this.challengeService.updateDayStatus(this.currentDay.dayInMonth,action);
    console.log(action)
	}
  ngOnDestroy(){
    if(this.currentChallengeSub){
      this.currentChallengeSub.unsubscribe();
    }

  }
}
