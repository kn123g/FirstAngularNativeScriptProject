import { Component, OnInit, Input } from "@angular/core";
import { ItemEventData } from "@nativescript/core/ui/list-view";
@Component({
	selector: "Viewchallenge",
	moduleId: module.id,
	templateUrl: "./viewChallenge.component.html",
	styleUrls: ['./viewChallenge.component.css']
})
export class ViewchallengeComponent implements OnInit {
	@Input() challengeValue: string[];
	constructor() {
	}
	onTapItem(item: ItemEventData) {
		console.log(item);
	}
	ngOnInit(): void {
	}
}
