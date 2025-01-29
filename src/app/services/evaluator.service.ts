import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluatorService {
  public concatenate(data: { [k: string]: number }): Observable<string> {
    return of(data).pipe(
      map((obj) =>
        Object.keys(obj)
          .sort()
          .map((key) => obj[key])
          .join('')
      ),
      delay(2000)
    );
  }

  public parity(data: { [k: string]: number }): Observable<boolean> {
    const sum = Object.values(data).reduce((sum, num) => sum + num, 0);
    return of(sum % 2 === 0);
  }
}
