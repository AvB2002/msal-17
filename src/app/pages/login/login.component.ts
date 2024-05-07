import { Component } from '@angular/core';
import { MSALComponent } from '../../components/msal.component';
import { RedirectRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends MSALComponent {

  loginRedirect() {
    this.authService.loginRedirect().subscribe();
  }

}
