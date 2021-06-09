import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import {TodayModalComponent} from "../TodayModal/TodayModal.component"
import {UIService} from "../shared/ui/ui.service"


@Component({
	selector: "Currentchallenge",
	moduleId: module.id,
	templateUrl: "./currentchallenge.component.html",
	styleUrls: ['./currentchallenge.component.scss']
})
export class CurrentchallengeComponent implements OnInit {
	shouldShowBackButton: boolean = false;
  weekDays =['S','M','T','W','T','F','S'];
  days:{dayInMonth:number,dayInWeek :number}[]=[];
	constructor(private router: RouterExtensions, private active: ActivatedRoute,
    private modalDialog : ModalDialogService,private viewRef:ViewContainerRef,
    private  uiService : UIService) { }
	ngOnInit(): void {
		if (this.router.canGoBack()) {
			this.shouldShowBackButton = true;
		}
    const currentYear = new Date().getFullYear() ;
    const currentMonth= new Date().getMonth();
    const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate();
    for (let i=1;i<daysInMonth +1 ;i++){
      const date = new Date(currentYear,currentMonth,i);
      const dateInWeek = date.getDay();
      this.days.push({dayInMonth:i,dayInWeek:dateInWeek});
    }
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
}
