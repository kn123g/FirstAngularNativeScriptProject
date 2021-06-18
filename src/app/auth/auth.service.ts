import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '@nativescript/core';
import { catchError ,tap} from 'rxjs/operators';
import { throwError,BehaviorSubject,of } from 'rxjs';
import {alert} from "@nativescript/core/ui/dialogs";
import {User} from './user.model';
import {getString,setString,hasKey,remove} from "@nativescript/core/application-settings";
import {RouterExtensions} from '@nativescript/angular';

const FIREBASE_API_KEY = 'AIzaSyD7jVPFMuSvjeoT0xgGTrh2VstmJEMzLec';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  get user() {
    return this._user.asObservable();
  }
  constructor(private http: HttpClient,private router :RouterExtensions) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      ).pipe(catchError(err => {
        this.handleError(err.error.error.message);
        return throwError(err);
      }),
      tap(resData => {
        if (resData && resData.idToken) {
          this.handleLogin(
            email,
            resData.idToken,
            resData.localId,
            parseInt(resData.expiresIn)
          );
        }
      })
      ) ;
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      ) .pipe(catchError(err => {
        this.handleError(err.error.error.message);
        return throwError(err);
      }),
      tap(resData => {
        if (resData && resData.idToken) {
          this.handleLogin(
            email,
            resData.idToken,
            resData.localId,
            parseInt(resData.expiresIn)
          );
        }
      })) ;
  }
  autoLogin() {
    if (!hasKey('userData')) {
      return of(false);
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(getString('userData'));

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.isAuth) {
      this._user.next(loadedUser);
      this.autoLogout(loadedUser.timeToExpiry);
      this.router.navigate(['challenges/tabs'],
			{ clearHistory: true, transition: { name: 'slideLeft' } });
      return of(true);
    }
    return of(false);
  }
  autoLogout(expiryDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expiryDuration);
  }
  handleError(err : string){
    switch (err) {
      case 'EMAIL_EXISTS':
        alert('This email address exists already!');
        break;
      case 'INVALID_PASSWORD':
        alert('Your password is invalid!');
        break;
      default:
        alert('Authentication failed, check your credentials.');
    }
  }

  logout(){
    this._user.next(null);
    remove('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate(['/'], { clearHistory: true });
  }
  private handleLogin(
    email: string,
    token: string,
    userId: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); //1000
    const user = new User(email, userId, token, expirationDate);
    setString('userData', JSON.stringify(user));
    this.autoLogout(user.timeToExpiry);
    this._user.next(user);
  }
}
