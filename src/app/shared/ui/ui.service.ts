import { Injectable, ViewContainerRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UIService {
    private _toggleState = new BehaviorSubject<void>(null);
    private viewRef : ViewContainerRef;
    constructor() { }
    get toggleState() {
        return this._toggleState.asObservable();
    }
    toggleDrawer() {
        this._toggleState.next(null);
    }
    setRootViewRef(viewRef : ViewContainerRef){
      this.viewRef=viewRef;
    }
    getRootViewRef(){
      return this.viewRef;
    }

}
