import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { RegionMenuComponent } from "../../components/region-menu/region-menu.component";
import { Region } from '../../types/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };
  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, RegionMenuComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  selectedRegion = linkedSignal<Region | null>(() => validateQueryParam(this.queryParams));

  countryResource = rxResource<Country[], {query: Region | null}>({
  params: () => ({ query: this.selectedRegion() }),
  stream: ({ params }) => {
    if (!params.query) return of([]);
    this.router.navigate(['/country/by-region'], { queryParams: { region: params.query } });
    return this.countryService.searchCountriesByRegion(params.query);
  },
  });

}
