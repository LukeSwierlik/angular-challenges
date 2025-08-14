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
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [type]="cardType"
      [nameProps]="'name'"
      (addNewItem)="addNewCity()"
      (removeItem)="delete($event)"
      customClass="bg-light-blue">
      <h3>Cities</h3>
      <img ngSrc="assets/img/city.png" width="200" height="200" />
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
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit() {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
