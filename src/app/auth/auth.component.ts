import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { Page } from "@nativescript/core";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "Auth",
	moduleId: module.id,
	templateUrl: "./auth.component.html",
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	onButtonTap(): void {
		console.log("Button was pressed");
		this.router.navigate(['challenges/tabs'],
			{ clearHistory: true, transition: { name: 'slideLeft' } });
	}


	constructor(private router: RouterExtensions, private page: Page, private active: ActivatedRoute) {
	}

	ngOnInit(): void {
		//this.page.actionBarHidden = true;
	}
}
