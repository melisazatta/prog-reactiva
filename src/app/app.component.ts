
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, from, interval } from 'rxjs';
import { map, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  
  observableData: Observable<number> | undefined;
  promiseData: Observable<string> | undefined;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.observableData = interval(1000).pipe(
      map((value) => value * 2),
      takeUntil(this.destroy$),
      takeWhile((value) => value <= 10)
    );
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('Contador finalizado');
      }, 7000);
    });

    this.promiseData = from(promise).pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}



// export class AppComponent implements OnDestroy {
//   observableData$: Observable<number> | undefined;
//   promiseData: Promise<string> | undefined;

//   private destroy$ = new Subject<void>();

//   ngOnDestroy() {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   startCounter() {
//     this.destroy$.next(); // Detener el contador actual si está en marcha
//     this.initCounter();
//   }

//   stopCounterWithPromise() {
//     this.promiseData = new Promise<string>((resolve) => {
//       setTimeout(() => {
//         resolve('Contador finalizado');
//         this.destroy$.next(); // Detener el contador cuando se cumple la promesa
//       }, 5000); // Cambia el tiempo a tu preferencia
//     });
//   }

//   private initCounter() {
//     this.observableData$ = interval(1000).pipe(
//       map((value) => value * 2),
//       takeUntil(this.destroy$),
//       takeWhile((value) => value <= 10)
//     );
//   }
// }