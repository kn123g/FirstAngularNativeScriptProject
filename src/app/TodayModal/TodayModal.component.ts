import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from '@nativescript/angular';

@Component({
	selector: "Todaymodal",
	moduleId: module.id,
	templateUrl: "./TodayModal.component.html",
	styleUrls: ['./TodayModal.component.css']
})
export class TodayModalComponent implements OnInit {
	modalDate: Date;
	constructor(private modalParams: ModalDialogParams) {
	}

	ngOnInit(): void {
		console.log(this.modalParams.context.date);
		this.modalDate = (this.modalParams.context as { date: Date }).date;
	}
	onBtnClick(btnValue: string): void {
		this.modalParams.closeCallback(btnValue);
	}
}
