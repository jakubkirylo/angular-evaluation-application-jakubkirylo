import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppState } from '../store/reducers/app.reducers';
import { selectIsBusy } from '../store/selectors/app.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  private store = inject(Store<{ app: AppState }>);

  // TODO: path not matching so currently it does not pull out data
  protected isBusy$: Observable<boolean> = this.store.select(selectIsBusy);
}
