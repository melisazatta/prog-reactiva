import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data = [
    { id: 1, name: 'Notebook', price: '$500'},
    { id: 2, name: 'Tablet', price: '$100' },
    { id: 3, name: 'Smart Tv', price: '$200' },
    { id: 4, name: 'Mousepad', price: '$80' },
    { id: 5, name: 'Monitor', price: '$150' },
    { id: 6, name: 'Smartphone', price: '$100' },
    { id: 7, name: 'Smartwatch', price: '$170' },
    { id: 8, name: 'keyboard', price: '$90' },
    { id: 9, name: 'Headphones', price: '$120' },
    { id: 10, name: 'Mouse', price: '$200' },

  ];

  getData(): Observable<any[]> {
    return of(this.data);
  }

  getDataAsPromise(): Promise<any[]> {
    return Promise.resolve(this.data);
  }
}