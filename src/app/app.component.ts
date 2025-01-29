import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppState } from './store/reducers/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBusyCount, selectIsBusy } from './store/selectors/app.selectors';
import { CommonModule } from '@angular/common';
import { AppActions } from './store/actions/app.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private store = inject(Store<{ app: AppState }>);

  // TODO: path not matching so currently it does not pull out data
  protected isBusy$: Observable<boolean> = this.store.select(selectIsBusy);

  increase() {
    this.store.dispatch(AppActions.increaseBusy());
  }

  decrease() {
    this.store.dispatch(AppActions.decreaseBusy());
  }

  title = 'angular-evaluation-application-jakubkirylo';
}
