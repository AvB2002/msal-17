import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil} from 'rxjs';

@Component({
  selector: 'app-msal',
  standalone: true,
  imports: [],
  template: ''
})
export class MSALComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();
  protected isIframe: boolean = false;
  protected router = inject(Router);

  constructor(
    @Inject(MSAL_GUARD_CONFIG) protected msalGuardConfig: MsalGuardConfiguration,
    protected authService: MsalService,
    protected msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener; 
    this.authService.handleRedirectObservable().subscribe();
    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .subscribe((result: EventMessage) => {
        if (result.eventType === EventType.LOGIN_SUCCESS) {
          this.router.navigate(['/home']);
        }
      });
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      ).subscribe();
  }

  ngOnDestroy() {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
