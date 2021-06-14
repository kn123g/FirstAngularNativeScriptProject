import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import{PageRoute} from "@nativescript/angular";
import {ChallengeService} from "../challenge/challenge.service";
import {Subscription} from 'rxjs';
import {Challenge} from "../challenge/challenge.model";

@Component({
	selector: "Edittchallenge",
	moduleId: module.id,
	templateUrl: "./editTChallenge.component.html",
	styleUrls: ['./editTChallenge.component.scss']
})
export class EdittchallengeComponent implements OnInit {
	shouldShowBackButton : boolean= false;
  isCreating : boolean = true;
	constructor(private active: ActivatedRoute,
    private router: RouterExtensions,private pageRoute :PageRoute,
    private challengeService: ChallengeService) {

	}

	ngOnInit(): void {
		if (this.router.canGoBack()) {
			console.log("editTchallenge can go back" + true)
			this.shouldShowBackButton = true;
		}
    this.pageRoute.activatedRoute.subscribe(activatedroute=>{
      activatedroute.paramMap.subscribe(params => {
        if(!params.get('mode')){
          this. isCreating  = true;
        }
        else{
          this.isCreating = params.get('mode') !== 'edit';
        }
      });
    });

	}

  onSubmit(txtField,txtView){
    console.log(txtField,txtView);
    this.challengeService.createNewChallenge(txtField,txtView);
    this.router.backToPreviousPage();

  }
}
