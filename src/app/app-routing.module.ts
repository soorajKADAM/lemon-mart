import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuardService } from './auth/auth-guard.service'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
  //{ path: 'manager', component: ManagerHomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then((m) => m.ManagerModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'pos',
    loadChildren: () => import('./pos/pos.module').then((m) => m.PosModule),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
