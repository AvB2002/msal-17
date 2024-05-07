import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Inject, Injectable, inject } from "@angular/core";
import { Location } from "@angular/common";
import { Observable, of } from "rxjs";
import { concatMap } from "rxjs/operators";

import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from "@azure/msal-angular";
import { BaseGuard } from "./base.guard";

@Injectable()
export class LoginGuard extends BaseGuard {

  constructor(
    @Inject(MSAL_GUARD_CONFIG) protected override msalGuardConfig: MsalGuardConfiguration,
    protected override msalBroadcastService: MsalBroadcastService,
    protected override authService: MsalService,
    protected override location: Location,
    protected override router: Router
  ) {
    super(msalGuardConfig, msalBroadcastService, authService, location, router);
  }

  override activateHelper(state?: RouterStateSnapshot, route?: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    let result = super.activateHelper(state, route);

    return result.pipe(
      concatMap(() => {
        let isLoggedIn = this.authService.instance.getAllAccounts()[0];

        if (!isLoggedIn) {
          return of(true);
        } else {
          this.router.navigate(['/home']);
          return of(false);
        }

      })
    );
  }
}