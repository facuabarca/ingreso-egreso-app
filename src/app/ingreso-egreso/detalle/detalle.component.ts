import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { filter } from 'rxjs/operators';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

	items: IngresoEgreso[];
	subscription: Subscription = new Subscription();
	constructor(private store: Store<fromIngresoEgreso.AppStateIngresoEgreso>, public ingresoEgresoService :IngresoEgresoService) { }

	ngOnInit() {
		this.subscription =this.store.select('ingresoEgreso')
			.pipe(
				filter(ingresoEgreso => ingresoEgreso.items.length > 0)
			)
			.subscribe(ingresoEgreso => this.items = ingresoEgreso.items);

	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	borrarItem(item: IngresoEgreso) {
		this.ingresoEgresoService.borrarIngresoEgreso(item);
	}

}
