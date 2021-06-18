import { Component, ElementRef, OnInit ,ViewChild} from "@angular/core";
import { RouterExtensions } from '@nativescript/angular';
import { Page, TextField, View } from "@nativescript/core";
import { ActivatedRoute } from "@angular/router";
import {FormControl,FormControlName,FormGroup,Validators} from "@angular/forms";
import { AuthService} from './auth.service';

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
  temp: string ='no error';
  isLoading = false;
  constructor(private router: RouterExtensions, private page: Page,
    private active: ActivatedRoute,private authService :AuthService) {
	}
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
    this.isLoading = true;
    if(this.isLogin){
      console.log("logging in")
      this.authService.login(this.form.get('userId').value,this.form.get('pass').value)
      .subscribe(resData => {
        console.log(resData);
        this.temp = 'success';
        this.isLoading = false;
        this.router.navigate(['challenges/tabs'],
			{ clearHistory: true, transition: { name: 'slideLeft' } });

    this.form.reset();
    this.userIdIsTrue = true;
    this.passwordIsTrue =true;
      },err =>{
        this.temp = "error"
        this.isLoading = false;
      });
    }else{
      console.log("Signing up")

    this.authService.signUp(this.form.get('userId').value,this.form.get('pass').value)
      .subscribe(resData => {
        console.log(resData);
        this.temp = 'success';
        this.isLoading = false;
        this.router.navigate(['challenges/tabs'],
			{ clearHistory: true, transition: { name: 'slideLeft' } });

    this.form.reset();
    this.userIdIsTrue = true;
    this.passwordIsTrue =true;
      },err =>{
        this.temp = "error"
        this.isLoading = false;
      });


    }
   // this.temp= this.form.get('userId').value + '  ' + this.form.get('pass').value;



  }

  //down keyboard
  onDone(){
    this.userEl.nativeElement.focus();
    this.passEl.nativeElement.focus();
    this.passEl.nativeElement.dismissSoftInput();
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
