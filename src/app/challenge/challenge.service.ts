import { Injectable, OnDestroy } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { BehaviorSubject,of, Subscription } from 'rxjs';
import { take ,tap , switchMap} from 'rxjs/operators';
import { Challenge } from './challenge.model';
import {Day, DayStatus} from "./day.model";
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ChallengeService implements OnDestroy{
  private _currentChallenge = new BehaviorSubject<Challenge>(null);
  private userSub : Subscription;
  constructor(private http : HttpClient,private authService :AuthService){
    this.userSub = this.authService.user.subscribe(user => {
      if(user == null){
        this.cleanUpChallenge();
      }
      });
  }
  get currentChallenge() {
      return this._currentChallenge.asObservable();
  }

  createNewChallenge(title: string, description: string) {
    const newChallenge = new Challenge(
      title,
      description,
      new Date().getFullYear(),
      new Date().getMonth()
    );
    // Save it to server
    this.saveToServer(newChallenge);

  }
  fetchCurrentChallenge(){
    return this.authService.user.pipe(
      take(1),
      switchMap(currentUser => {
        if(!currentUser || !currentUser.isAuth){
          return of(null);
        }
        return this.http.get<{
          title: string;
          description: string;
          month: number;
          year: number;
          _days: Day[];
        }>(
          `https://ns-first-app-default-rtdb.firebaseio.com/challenge/${currentUser.id}.json?auth=${
            currentUser.token
          }`
        );
      }),
      tap(resData => {
        if (resData) {
          const loadedChallenge = new Challenge(
            resData.title,
            resData.description,
            resData.year,
            resData.month,
            resData._days
          );
          this._currentChallenge.next(loadedChallenge);
        }
      })
    );
  }
  updateChallenge(title:string , description :string){
    this._currentChallenge.pipe(take(1)).subscribe(challenge=>{
      const updateChallenge = new Challenge(title,description,challenge.year,challenge.month,challenge.days);
      this.saveToServer(updateChallenge);
      this._currentChallenge.next(updateChallenge);
    });
  }


  updateDayStatus(dayInMonth: number, status: DayStatus) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      if (!challenge || challenge.days.length < dayInMonth) {
        return;
      }
      const dayIndex = challenge.days.findIndex(
        d => d.dayInMonth === dayInMonth
      );
      challenge.days[dayIndex].status = status;
      this._currentChallenge.next(challenge);
      // Save this to a server
      this.saveToServer(challenge);
    });
  }
  private saveToServer(challenge: Challenge) {

    this.authService.user.pipe(
      take(1),
      switchMap(currentUser =>{
        if(!currentUser || !currentUser.isAuth){
          return of(null);
        }
        return this.http.put<{
          title: string;
          description: string;
          month: number;
          year: number;
          _days: Day[];
        }>(
          `https://ns-first-app-default-rtdb.firebaseio.com/challenge/${currentUser.id}.json?auth=${
            currentUser.token
          }`,challenge
        );
      })
      ).subscribe(()=>{
        this._currentChallenge.next(challenge);
    });

  }

  cleanUpChallenge (){
    this._currentChallenge.next(null);
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
