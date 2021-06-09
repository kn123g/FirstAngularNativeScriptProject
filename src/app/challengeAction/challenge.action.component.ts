import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "challenge-action",
	moduleId: module.id,
	templateUrl: "./challenge.action.component.html",
	styleUrls: ['./challenge.action.component.scss']
})

export class ChallangeActionComponent implements OnInit {

	constructor(private router: RouterExtensions, private active: ActivatedRoute) { }
	@Output() actionEmitter = new EventEmitter<string>();
  @Input() cancelReset = 'Cancel';
  ngOnInit(): void {

	}
	onActionTap(action : 'complete' | 'fail' | 'cancel') {
    this.actionEmitter.emit(action);
    console.log(action)
	}
}
