import { Component, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import {TodayModalComponent} from "../TodayModal/TodayModal.component"
import {UIService} from "../shared/ui/ui.service";
import {ChallengeService} from "../challenge/challenge.service";
import {Subscription} from 'rxjs';

import {Challenge} from "../challenge/challenge.model";



@Component({
	selector: "Currentchallenge",
	moduleId: module.id,
	templateUrl: "./currentchallenge.component.html",
	styleUrls: ['./currentchallenge.component.scss']
})
export class CurrentchallengeComponent implements OnInit,OnDestroy {
	shouldShowBackButton: boolean = false;
  weekDays =['S','M','T','W','T','F','S'];
  //days:{dayInMonth:number,dayInWeek :number}[]=[];
  private curChallengeSub: Subscription;
  currentChallenge: Challenge;

	constructor(private router: RouterExtensions, private active: ActivatedRoute,
    private modalDialog : ModalDialogService,private viewRef:ViewContainerRef,
    private  uiService : UIService,private challengeService: ChallengeService) { }
	ngOnInit(): void {
		if (this.router.canGoBack()) {
			this.shouldShowBackButton = true;
		}
    this.curChallengeSub = this.challengeService.currentChallenge.subscribe(
      challenge => {
        this.currentChallenge = challenge;
      }
    );
	}
  getRow(index,day):number{
    const currentYear = new Date().getFullYear() ;
    const currentMonth= new Date().getMonth();
    const startRow = 1;
    const weekRow =Math.floor(index/7);
    const firstWeekDayOfMonth= new Date(currentYear,currentMonth,1).getDay();
    const irregularRow= (day.dayInWeek < firstWeekDayOfMonth) ? 1 :0;
    return startRow + weekRow +irregularRow;
  }
	onBtnTap(param) {
		// this.router.navigate([{ outlets: { currentchallenge: ["editTChallenge"] } }],
		// 	{ relativeTo: this.active }
		// );

		this.router.navigate(['challenges/'+param,
			// { outlets: { currentchallenge: ['editTChallenge'] } }
		], { clearHistory: false, transition: { name: 'slideLeft' } });
	}

  onStatusChange(){
    this.modalDialog.showModal(TodayModalComponent,{fullscreen:true,
      viewContainerRef: this.uiService.getRootViewRef() ? this.uiService.getRootViewRef() : this.viewRef,context:{date:new Date()}
		}).then((action : string) => {
			console.log(action);
		});
    //this.viewRef -> gets view of current component and load Dialog on top of it

  }
  ngOnDestroy() {
    if (this.curChallengeSub) {
      this.curChallengeSub.unsubscribe();
    }
  }
}
