import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class UIService {
    private _toggleState = new BehaviorSubject<void>(null);
    constructor() { }
    get toggleState() {
        return this._toggleState.asObservable();
    }
    toggleDrawer() {
        this._toggleState.next(null);
    }

}