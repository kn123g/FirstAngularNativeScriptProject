import { Component, OnInit, Input } from "@angular/core";

import { isAndroid } from "@nativescript/core/platform";
import { Page } from '@nativescript/core/ui/page';
import { RouterExtensions } from "@nativescript/angular";
import { Application } from "@nativescript/core";
import { UIService } from "../ui.service";

declare var android: any;
@Component({
	selector: "shared-actionbar",
	moduleId: module.id,
	templateUrl: "./actionBar.component.html",
	styleUrls: ['./actionBar.component.css']
})
export class ActionbarComponent implements OnInit {
	@Input() iTitle: string;
	@Input() hasMenu: boolean = true;
	@Input() showBackButton: boolean = true;


	get canGoBack() {
		console.log("can go back " + this.router.canGoBack());
		return this.router.canGoBack();
	}
	get issAndroid() {
		return isAndroid;
	}
	constructor(private page: Page, private router: RouterExtensions, private uiService: UIService) {
	}

	onGoBack() {
		this.router.backToPreviousPage();
	}
	onActionBarLoaded() {
		if (this.issAndroid) {
			const actionBar = this.page.actionBar.nativeView;
			console.log("action bar variable " + actionBar);
			const icon = actionBar.getNavigationIcon();
			if (icon) {
				console.log("has back icon")
				icon.setColorFilter(android.graphics.Color.parseColor("#c80d5b"),
					(<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
			}
		}
	}
	onToggleMenu() {
		this.uiService.toggleDrawer();
	}
	ngOnInit(): void {

	}
}
