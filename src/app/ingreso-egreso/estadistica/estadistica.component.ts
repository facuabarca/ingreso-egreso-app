import { Component, OnInit } from '@angular/core';
// import { AppState } from '../../app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromIngresoEgreso.AppStateIngresoEgreso>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe( ingresoEgreso => this.contarIngresoEgresos(ingresoEgreso.items) );
  }

  contarIngresoEgresos(items: IngresoEgreso[]) {

    this.ingresos = 0, this.egresos = 0, this.cuantosEgresos = 0, this.cuantosIngresos = 0;

    items.forEach( item => {
      if(item.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos = this.ingresos + item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });

  }

}
