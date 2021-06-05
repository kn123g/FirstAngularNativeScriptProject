import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular'
import { Page } from '@nativescript/core/ui/page';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: "Tabchallenge",
	moduleId: module.id,
	templateUrl: "./tabChallenge.component.html",
	styleUrls: ['./tabChallenge.component.css']
})
export class TabchallengeComponent implements OnInit {

	constructor(private router: RouterExtensions, private page: Page, private active: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.router.navigate([{ outlets: { today: ["today"], currentchallenge: ["currentchallenge"] } }],
			{ relativeTo: this.active });
		this.page.actionBarHidden = true;
	}
}
