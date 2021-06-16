import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from '@nativescript/angular'
import { Page } from '@nativescript/core/ui/page';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../challenge/challenge.service';
@Component({
	selector: "Tabchallenge",
	moduleId: module.id,
	templateUrl: "./tabChallenge.component.html",
	styleUrls: ['./tabChallenge.component.css']
})
export class TabchallengeComponent implements OnInit {

  isLoading = false;
	constructor(private router: RouterExtensions, private page: Page,
    private active: ActivatedRoute,private challengeService :ChallengeService) {
	}

	ngOnInit(): void {
    this.page.actionBarHidden = true;
  this.isLoading= true;
    this.challengeService.fetchCurrentChallenge().subscribe(res =>{
      console.log(res)
      this.isLoading= false;
      this.loadTabs();
    },err =>{
      console.log(err)
      this.isLoading= false;
      this.loadTabs();
    });

	}
  loadTabs(){
    setTimeout(()=>{
      this.router.navigate([{ outlets: { today: ["today"], currentchallenge: ["currentchallenge"] } }],
			{ relativeTo: this.active });

    },10);
  }
}
