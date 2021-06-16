import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from '@nativescript/angular';
import { DayStatus } from "../challenge/day.model";

@Component({
	selector: "Todaymodal",
	moduleId: module.id,
	templateUrl: "./TodayModal.component.html",
	styleUrls: ['./TodayModal.component.css']
})
export class TodayModalComponent implements OnInit {
	loadedDate: Date;
  loadedStatus : 'complete' | 'fail' = null;
	constructor(private modalParams: ModalDialogParams) {
	}

	ngOnInit(): void {
		console.log(this.modalParams.context);
    const parseParams =  (this.modalParams.context as { date: Date ,status: DayStatus});
		this.loadedDate =parseParams.date;
    if(parseParams.status === DayStatus.Completed){
      this.loadedStatus = 'complete';
    }
    else if(parseParams.status === DayStatus.Failed){
      this.loadedStatus = 'fail';
    }
    else{
      this.loadedStatus = null;
    }
	}
	onActionTap(btnValue: DayStatus): void {
		this.modalParams.closeCallback(btnValue);
	}
}
