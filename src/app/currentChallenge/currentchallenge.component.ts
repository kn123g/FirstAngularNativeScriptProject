import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from "@angular/router";
import {TodayModalComponent} from "../TodayModal/TodayModal.component"
import {UIService} from "../shared/ui/ui.service"


@Component({
	selector: "Currentchallenge",
	moduleId: module.id,
	templateUrl: "./currentchallenge.component.html",
	styleUrls: ['./currentchallenge.component.css']
})
export class CurrentchallengeComponent implements OnInit {
	shouldShowBackButton: boolean = false;

	constructor(private router: RouterExtensions, private active: ActivatedRoute,
    private modalDialog : ModalDialogService,private viewRef:ViewContainerRef,
    private  uiService : UIService) { }
	ngOnInit(): void {
		if (this.router.canGoBack()) {
			this.shouldShowBackButton = true;
		}
	}
	onBtnTap(param) {
		// this.router.navigate([{ outlets: { currentchallenge: ["editTChallenge"] } }],
		// 	{ relativeTo: this.active }
		// );

		this.router.navigate(['challenges/'+param,
			// { outlets: { currentchallenge: ['editTChallenge'] } }
		], { clearHistory: false, transition: { name: 'slideLeft' } });
	}

  onStatusChange(){
    this.modalDialog.showModal(TodayModalComponent,{fullscreen:true,
      viewContainerRef: this.uiService.getRootViewRef() ? this.uiService.getRootViewRef() : this.viewRef,context:{date:new Date()}
		}).then((action : string) => {
			console.log(action);
		});
    //this.viewRef -> gets view of current component and load Dialog on top of it

  }
}
