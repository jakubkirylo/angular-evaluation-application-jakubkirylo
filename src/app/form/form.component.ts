import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  public red = signal('');
  green = signal('');
  blue = signal('');

  public submit(): void {
    console.warn('Submitted values:', {
      red: this.red(),
      green: this.green(),
      blue: this.blue(),
    });
  }
}
