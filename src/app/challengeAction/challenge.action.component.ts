import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import { DayStatus } from "../challenge/day.model";


@Component({
	selector: "challenge-action",
	moduleId: module.id,
	templateUrl: "./challenge.action.component.html",
	styleUrls: ['./challenge.action.component.scss']
})

export class ChallangeActionComponent implements OnInit {

	constructor(private router: RouterExtensions, private active: ActivatedRoute) { }
	@Output() actionEmitter = new EventEmitter<DayStatus>();
  @Input() cancelReset = 'Cancel';
  action : 'complete' | 'fail'  = null;
  ngOnInit(): void {

	}
	onActionTap(action : 'complete' | 'fail' | 'cancel') {
    let status = DayStatus.Completed;
    if(action === 'fail'){
      status = DayStatus.Failed;
      this.action = 'fail';
    }
    else if(action === 'cancel'){
      status = DayStatus.Open;
      this.action = null;
    }
    else if(action === 'complete'){
      this.action = 'complete';
    }
    this.actionEmitter.emit(status);
    console.log(action)
	}
}
