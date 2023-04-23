import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2">Hello, Limoncu!</span>
      <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
        <button mat-raised-button color="primary">Login</button>
        <button mat-raised-button color="primary" routerLink="/manager">
          Login as Manager
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class HomeComponent {}
