import { TestBed } from '@angular/core/testing'
import { MediaObserver } from '@angular/flex-layout'
import { RouterTestingModule } from '@angular/router/testing'

import { AppComponent } from './app.component'
import {
  MediaObserverFake,
  commonTestingModules,
  commonTestingProviders,
} from './common/common.testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, commonTestingModules],
      declarations: [AppComponent],
      providers: commonTestingProviders.concat([
        {
          provide: MediaObserver,
          useClass: MediaObserverFake,
        },
      ]),
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'lemon-mart'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'lemon-mart app is running!'
    )
  })
})
