import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef }
    from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from './shared/ui/ui.service';
import { RadSideDrawerComponent }
    from "nativescript-ui-sidedrawer/angular"
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(RadSideDrawerComponent, { static: true }) sideDrawerComponent: RadSideDrawerComponent;
  currentChallenge: string[] = [];
  private drawerSub: Subscription;
  private drawer: RadSideDrawer;
  constructor(private uiService: UIService,
      private changeDetect: ChangeDetectorRef,
      private viewRef : ViewContainerRef) {

  }
  currentChallengeChange(input: string) {
      this.currentChallenge.push(input);
      console.log("Pushed value" + input);
  }
  onLogout() {
      this.uiService.toggleDrawer();
  }
  ngOnInit() {
      this.drawerSub = this.uiService.toggleState.subscribe(result => {
          if (this.drawer) {
              this.drawer.toggleDrawerState();
          }
      });
      this.uiService.setRootViewRef(this.viewRef);
  }
  ngAfterViewInit() {
      this.drawer = this.sideDrawerComponent.sideDrawer;
      this.changeDetect.detectChanges();
  }
  ngOnDestroy() {
      if (this.drawerSub) {
          this.drawerSub.unsubscribe();
      }
  }
}
