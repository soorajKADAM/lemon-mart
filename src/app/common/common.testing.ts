import { autoSpyObj } from 'angular-unit-test-helper'

import { AuthService } from '../auth/auth.service'

export const commonTestingProviders: any[] = [
  { provide: AuthService, useValue: autoSpyObj(AuthService) },
]
