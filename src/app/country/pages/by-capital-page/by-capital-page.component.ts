import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';

import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('')

  countryResource = rxResource<Country[], {query: string}>({
    params: () => ({ query: this.query() }),
    stream: ({params}) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCapital(params.query);
    },
  });

  // * Traditional way angular 17
  // isLoading = signal<boolean>(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(capital: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(capital).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.update(() => countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }
  //   })
  // }
}
