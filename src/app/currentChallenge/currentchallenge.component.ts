import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "Currentchallenge",
	moduleId: module.id,
	templateUrl: "./currentchallenge.component.html",
	styleUrls: ['./currentchallenge.component.css']
})
export class CurrentchallengeComponent implements OnInit {
	shouldShowBackButton: boolean = false;
	constructor(private router: RouterExtensions, private active: ActivatedRoute) { }
	ngOnInit(): void {
		if (this.router.canGoBack()) {
			this.shouldShowBackButton = true;
		}
	}
	onBtnTap() {
		// this.router.navigate([{ outlets: { currentchallenge: ["editTChallenge"] } }],
		// 	{ relativeTo: this.active }
		// );

		this.router.navigate(['challenges/edit',
			// { outlets: { currentchallenge: ['editTChallenge'] } }
		], { clearHistory: false, transition: { name: 'slideLeft' } });
	}
}
