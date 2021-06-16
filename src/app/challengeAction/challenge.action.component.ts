import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import { DayStatus } from "../challenge/day.model";


@Component({
	selector: "challenge-action",
	moduleId: module.id,
	templateUrl: "./challenge.action.component.html",
	styleUrls: ['./challenge.action.component.scss']
})

export class ChallangeActionComponent implements OnInit,OnChanges {

	constructor(private router: RouterExtensions, private active: ActivatedRoute) { }
	@Output() actionEmitter = new EventEmitter<DayStatus>();
  @Input() cancelReset = 'Cancel';
  @Input() chosen  : 'complete' | 'fail'  = null;
  @Input() startDone = false;
  action : 'complete' | 'fail'  = null;
  done = false;
  ngOnInit(): void {

	}
  ngOnChanges(changes : SimpleChanges){
    if(changes.chosen){
      this.action = changes.chosen.currentValue;
      if(changes.chosen.currentValue === null){
          this.done=false;
      }
      // else{
      //   this.done =true;
      // }
    }
    if(changes.startDone){
      if(changes.startDone.currentValue){
          this.startDone =true;
      }

    }


  }
	onActionTap(action : 'complete' | 'fail' | 'cancel') {
    this.done = true;
    let status = DayStatus.Completed;
    if(action === 'fail'){
      status = DayStatus.Failed;
      this.action = 'fail';
    }
    else if(action === 'cancel'){
      status = DayStatus.Open;
      this.action = null;
      this.done = false;
    }
    else if(action === 'complete'){
      this.action = 'complete';
    }
    this.actionEmitter.emit(status);
    console.log(action)
	}
}
