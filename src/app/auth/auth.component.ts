import { Component, ElementRef, OnInit ,ViewChild} from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { Page, TextField, View } from "@nativescript/core";
import { ActivatedRoute } from "@angular/router";
import {FormControl,FormControlName,FormGroup,Validators} from "@angular/forms";

@Component({
	selector: "Auth",
	moduleId: module.id,
	templateUrl: "./auth.component.html",
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('userEl')  userEl : ElementRef<TextField>;
  @ViewChild('passEl')  passEl : ElementRef<TextField>;
  form : FormGroup;
  userIdIsTrue = true;
  passwordIsTrue =true;
  isLogin = true;
  temp: string;
	onButtonTap(): void {
		console.log("Button was pressed");

	}

  onModeChange(){
    this.isLogin = !this.isLogin;
  }
  onSubmit(){
    this.userEl.nativeElement.focus();
    this.passEl.nativeElement.focus();
    this.passEl.nativeElement.dismissSoftInput();

    if(!this.form.valid){
      return ;
    }
    if(this.isLogin){
      console.log("logging in")
    }else{
      console.log("Signing up")
    }
    this.temp= this.form.get('userId').value + '  ' +
    this.form.get('pass').value;

    this.router.navigate(['challenges/tabs'],
			{ clearHistory: true, transition: { name: 'slideLeft' } });

    this.form.reset();
    this.userIdIsTrue = true;
    this.passwordIsTrue =true;

  }

  //down keyboard
  onDone(){
    this.userEl.nativeElement.focus();
    this.passEl.nativeElement.focus();
    this.passEl.nativeElement.dismissSoftInput();
  }

	constructor(private router: RouterExtensions, private page: Page, private active: ActivatedRoute) {
	}

	ngOnInit(): void {
		//this.page.actionBarHidden = true;
    this.form= new FormGroup({
      userId:new FormControl(null,{updateOn:'blur',validators:[Validators.required,Validators.email]}),
      pass: new FormControl(null,{updateOn:'blur',validators:[Validators.required,Validators.minLength(6)]})
    });

    this.form.get('userId').statusChanges.subscribe(status=>{
      this.userIdIsTrue = status === 'VALID';
    });
    this.form.get('pass').statusChanges.subscribe(status=>{
      this.passwordIsTrue = status === 'VALID';
    });
	}
}
