import { Component } from '@angular/core';
import { MSALComponent } from '../../components/msal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends MSALComponent {

  logoutRedirect() {
    this.authService.logoutRedirect();
  }

}
