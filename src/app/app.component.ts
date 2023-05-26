import { Component, OnInit } from '@angular/core'
import { MediaObserver } from '@angular/flex-layout'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import {
  Event,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router'
import { combineLatest, filter, tap } from 'rxjs'
import { SubSink } from 'subsink'

import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  // prettier-ignore
  template: `
    <div class="app-container">
    <mat-toolbar
      color="primary"
      fxLayoutGap="8px"
      class="app-toolbar"
    [class.app-is-mobile]="media.isActive('xs')"
      *ngIf="{
        status: authService.authStatus$ | async,
        user: authService.currentUser$ | async
      } as auth"
    >
      <button mat-icon-button *ngIf="auth?.status?.isAuthenticated" (click)="sidenav.toggle()"><mat-icon>menu</mat-icon></button>
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
    <mat-sidenav-container class="app-sidenav-container">
    <mat-sidenav #sidenav
      [mode]="media.isActive('xs') ? 'over' : 'side'"
      [fixedInViewport]="media.isActive('xs')"
      fixedTopGap="56" [(opened)]="opened"
    >
      <app-navigation-menu></app-navigation-menu>
    </mat-sidenav>
    <mat-sidenav-content>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
  </div>
    <div class="loader" *ngIf="displayLoader"></div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private subs = new SubSink()
  opened!: boolean
  displayLoader = false
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService: AuthService,
    private router: Router,
    public media: MediaObserver
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
    this.subs.sink = combineLatest([
      this.media.asObservable(),
      this.authService.authStatus$,
    ])
      .pipe(
        tap(([mediaValue, authStatus]) => {
          if (!authStatus?.isAuthenticated) {
            this.opened = false
          } else {
            if (mediaValue[0].mqAlias === 'xs') {
              this.opened = false
            } else {
              this.opened = true
            }
          }
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
