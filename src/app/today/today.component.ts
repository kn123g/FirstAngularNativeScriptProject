import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import { ChallengeService } from "../challenge/challenge.service";
import { Day } from "../challenge/day.model";
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
    private todayChallenge : ChallengeService) { }
	ngOnInit(): void {
		if (this.router.canGoBack()) {
			this.shouldShowBackButton = true;
		}
    this.currentChallengeSub= this.todayChallenge.currentChallenge.subscribe(challenge=>{
      if(challenge){
        this.currentDay = challenge.currentDay;
      }
    });

	}
	onActionTap(action : 'complete' | 'fail' | 'cancel') {
    console.log(action)
	}
  ngOnDestroy(){
    if(this.currentChallengeSub){
      this.currentChallengeSub.unsubscribe();
    }

  }
}
