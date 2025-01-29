import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  private readonly _store = inject(Store);

  protected isBusy$: Observable<boolean> = this._store.select(selectIsBusy);
}
