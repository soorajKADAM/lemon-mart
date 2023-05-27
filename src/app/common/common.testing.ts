import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { autoSpyObj } from 'angular-unit-test-helper'

import { AuthService } from '../auth/auth.service'
import { MaterialModule } from '../material.module'
import { UiService } from './ui.service'

export const commonTestingProviders: any[] = [
  { provide: AuthService, useValue: autoSpyObj(AuthService) },
  { provide: UiService, useValue: autoSpyObj(UiService) },
]

export class MediaObserverFake {
  isActive(query: string): boolean {
    return false
  }
}
export const commonTestingModules: any[] = [
  ReactiveFormsModule,
  MaterialModule,
  NoopAnimationsModule,
  RouterTestingModule,
]
