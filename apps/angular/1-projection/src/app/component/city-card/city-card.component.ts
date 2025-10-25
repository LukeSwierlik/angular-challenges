import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [nameProps]="'name'"
      (addNewItem)="addNewCity()"
      (removeItem)="delete($event)"
      customClass="bg-light-blue">
      <!-- // to jest zawartosc dla ng-content -->
      <h3 class="font-semibold">Cities</h3>
      <img
        ngSrc="../../../assets/img/city.png"
        width="200"
        height="200"
        alt="city-png" />
      <!-- // to jest zawartosc dla ng-content -->
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-blue {
        background-color: rgba(14, 160, 174, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit() {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  delete(id: number): void {
    this.store.deleteOne(id);
  }
}
