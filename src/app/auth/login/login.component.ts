import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService, public store: Store<AppState>,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );
  }

  onSubmit(data): void {
    this.authService.login(data.email, data.password);
  }

  createAccount() {
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
