import { Component, OnInit } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import {
  NavigationEnd,
  NavigationStart,
  Event,
  RouterEvent,
  Router,
} from '@angular/router'
import { filter } from 'rxjs'

import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar
      color="primary"
      fxLayoutGap="8px"
      *ngIf="{
        status: authService.authStatus$ | async,
        user: authService.currentUser$ | async
      } as auth"
    >
      <button mat-icon-button><mat-icon>menu</mat-icon></button>
      <mat-icon style="transform: scale(2);" svgIcon="lemon"></mat-icon>
      <a mat-button routerLink="/home">
        <h1>LemonMart</h1>
      </a>
      <span class="flex-spacer"></span>
      <button
        *ngIf="auth?.status?.isAuthenticated"
        mat-mini-fab
        routerLink="/user/profile"
        matTooltip="Profile"
        aria-label="User Profile"
      >
        <mat-icon *ngIf="auth?.user?.picture">account_circle</mat-icon>
        <img
          *ngIf="auth?.user?.picture"
          class="image-cropper"
          [src]="auth?.user?.picture"
        />
      </button>
      <button
        *ngIf="auth?.status?.isAuthenticated"
        mat-mini-fab
        routerLink="/user/logout"
        matTooltip="Logout"
        aria-label="Logout"
      >
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
    <div class="loader" *ngIf="displayLoader"></div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayLoader = false
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService: AuthService,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/lemon.svg')
    )
  }
  ngOnInit() {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.displayLoader = true
      }
      if (routerEvent instanceof NavigationEnd) {
        this.displayLoader = false
      }
      this.router.events
        .pipe(filter((event) => event instanceof RouterEvent))
        .subscribe((event) => {
          console.log(
            `the current event is :  ${(event as RouterEvent).url} | ${
              (event as RouterEvent).id
            }`
          )
        })
    })
  }
}
