import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "Editchallenge",
	moduleId: module.id,
	templateUrl: "./editChallenge.component.html",
	styleUrls: ['./editChallenge.component.css']
})
export class EditchallengeComponent implements OnInit {
	@Output() challenge = new EventEmitter<string>();
	challengeTextFieldValue: string;

	onButtonTap(): void {
		this.challenge.emit(this.challengeTextFieldValue);
	}
	constructor() {
	}

	ngOnInit(): void {
	}
}
