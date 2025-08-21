import { CountryService } from './../../services/country.service';
import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParams);

  // * resource traditional
  // countryResource = resource({
  //   params: () => ({ query: this.country() }),
  //   loader: async ({params}) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     )
  //   }
  // })

  // * rxResource angular20
  countryResource = rxResource<Country[], {query: string}>({
  params: () => ({ query: this.query() }),
  stream: ({ params }) => {
    if (!params.query) return of([]);
    this.router.navigate(['/country/by-country'], { queryParams: { query: params.query } });
    return this.countryService.searchByCountry(params.query);
  },
  });

}
