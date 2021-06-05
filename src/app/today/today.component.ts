import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "Today",
	moduleId: module.id,
	templateUrl: "./today.component.html",
	styleUrls: ['./today.component.css']
})

export class TodayComponent implements OnInit {

	shouldShowBackButton: boolean = false;
	constructor(private router: RouterExtensions, private active: ActivatedRoute) { }
	ngOnInit(): void {
		if (this.router.canGoBack()) {
			this.shouldShowBackButton = true;
		}

	}
	onBtnTap() {

	}
}
