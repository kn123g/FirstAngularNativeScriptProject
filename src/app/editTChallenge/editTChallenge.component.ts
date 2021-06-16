import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import{PageRoute} from "@nativescript/angular";
import {ChallengeService} from "../challenge/challenge.service";
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators'
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
  title : string = '';
  description :string ='';
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

        if(!this.isCreating){
          this.challengeService.currentChallenge.pipe(take(1)).subscribe(challenge => {
            this.title=challenge.title;
            this.description=challenge.description;

          });
        }
      });
    });



	}

  onSubmit(title,description){
    console.log(title,description);
    if(!this.isCreating){
      this.challengeService.updateChallenge(title,description);
    }
    else{
      this.challengeService.createNewChallenge(title,description);

    }
    this.router.backToPreviousPage();
  }
}
