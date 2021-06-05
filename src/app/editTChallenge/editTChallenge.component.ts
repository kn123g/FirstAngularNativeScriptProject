import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import{PageRoute} from "@nativescript/angular";

@Component({
	selector: "Edittchallenge",
	moduleId: module.id,
	templateUrl: "./editTChallenge.component.html",
	styleUrls: ['./editTChallenge.component.css']
})
export class EdittchallengeComponent implements OnInit {
	shouldShowBackButton : boolean= false;
	constructor(private active: ActivatedRoute, private router: RouterExtensions,private pageRoute :PageRoute) {

	}

	ngOnInit(): void {
		if (this.router.canGoBack()) {
			console.log("editTchallenge can go back" + true)
			this.shouldShowBackButton = true;
		}
    this.pageRoute.activatedRoute.subscribe(activatedroute=>{
      activatedroute.paramMap.subscribe(params => {
        console.log(params.get('mode'));
      });
    });

	}
}
