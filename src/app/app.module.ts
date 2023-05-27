import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor'
import { InMemoryAuthService } from './auth/auth.inmemory.service'
import { AuthService } from './auth/auth.service'
import { SimpleDialogComponent } from './common/simple-dialog/simple-dialog.component'
import { UiService } from './common/ui.service'
import { HomeComponent } from './home/home.component'
import { InventoryModule } from './inventory/inventory.module'
import { LoginComponent } from './login/login.component'
import { MaterialModule } from './material.module'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { PosModule } from './pos/pos.module'
import { UserModule } from './user/user.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    InventoryModule,
    PosModule,
    UserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [
    {
      provide: AuthService,
      useClass: InMemoryAuthService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
