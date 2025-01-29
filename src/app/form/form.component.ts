import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppState } from '../store/reducers/app.reducers';
import { Store } from '@ngrx/store';
import { Observable, shareReplay } from 'rxjs';
import { selectIsBusy } from '../store/selectors/app.selectors';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  private readonly fb = inject(FormBuilder);
  private store = inject(Store<{ app: AppState }>);

  protected isBusy$: Observable<boolean> = this.store
    .select(selectIsBusy)
    .pipe(shareReplay(1));

  protected form: FormGroup = this.fb.group({
    red: ['', [Validators.required, Validators.min(3), Validators.max(15)]],
    green: ['', [Validators.required, Validators.min(3), Validators.max(15)]],
    blue: ['', [Validators.required, Validators.min(3), Validators.max(15)]],
  });

  public submit(): void {}
}
