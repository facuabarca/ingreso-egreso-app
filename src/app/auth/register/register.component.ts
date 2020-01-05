import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription = new Subscription();

  constructor(public authService: AuthService, public store: Store<AppState>,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => 
      this.cargando = ui.isLoading
    );
  }

  login(){
    this.router.navigate(['/login']);
  }

  onSubmit(data: any) {
    this.authService.crearUsuario(data.nombre, data.email, data.password);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
