import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "Today",
	moduleId: module.id,
	templateUrl: "./today.component.html",
	styleUrls: ['./today.component.scss']
})

export class TodayComponent implements OnInit {

	shouldShowBackButton: boolean = false;
	constructor(private router: RouterExtensions, private active: ActivatedRoute) { }
	ngOnInit(): void {
		if (this.router.canGoBack()) {
			this.shouldShowBackButton = true;
		}

	}
	onActionTap(action : 'complete' | 'fail' | 'cancel') {
    console.log(action)
	}
}
