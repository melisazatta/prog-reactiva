import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-consumir-servicio',
  templateUrl: './consumir-servicio.component.html',
  styleUrls: ['./consumir-servicio.component.scss']
})
export class ConsumirServicioComponent implements OnInit, OnDestroy {
  filterControl = new FormControl();
  data: any[] = [];
  filteredData: any[] = [];
  filteredData$: Subscription | undefined;
  dataPromise: Promise<any[]> | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getDataAsPromise().then((data) => {
      this.dataPromise = Promise.resolve(data);
    });

    this.filteredData$ = this.filterControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.filterData(term))
      )
      .subscribe((filteredData) => {
        this.filteredData = filteredData;
      });
  }

  filterData(term: string): Observable<any[]> {
    return this.dataService.getData().pipe(
      map((data) =>
        data.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()))
      )
    );
  }

  ngOnDestroy() {
    if (this.filteredData$) {
      this.filteredData$.unsubscribe();
    }
  }
}