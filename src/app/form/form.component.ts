import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, shareReplay, tap } from 'rxjs';
import { selectIsBusy } from '../store/selectors/app.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppActions } from '../store/actions/app.actions';
import { EvaluatorService } from '../services/evaluator.service';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _evaluatorService = inject(EvaluatorService);

  protected readonly concatenatedValue = signal<string | null>(null);
  protected readonly parityValue = signal<boolean | null>(null);
  protected readonly isBusy$: Observable<boolean> = this._store
    .select(selectIsBusy)
    .pipe(shareReplay(1));

  protected form: FormGroup = this._fb.group({
    red: ['', [Validators.required, Validators.min(3), Validators.max(15)]],
    green: ['', [Validators.required, Validators.min(3), Validators.max(15)]],
    blue: ['', [Validators.required, Validators.min(3), Validators.max(15)]],
  });

  constructor() {
    this.isBusy$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((isBusy) => {
        if (isBusy) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = { ...this.form.value };
    this.processSubmittedValues(formData);
  }

  private processSubmittedValues(data: { [k: string]: number }): void {
    this._store.dispatch(AppActions.increaseBusy());

    forkJoin({
      concatenated: this._evaluatorService.concatenate(data),
      parity: this._evaluatorService.parity(data),
    })
      .pipe(tap(() => this._store.dispatch(AppActions.decreaseBusy())))
      .subscribe(({ concatenated, parity }) => {
        this.concatenatedValue.set(concatenated);
        this.parityValue.set(parity);
      });
  }
}
