import { Component, computed, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { RegionMenuComponent } from "../../components/region-menu/region-menu.component";
import { Region } from '../../types/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, RegionMenuComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public countryService = inject(CountryService);

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource<Country[], {query: Region | null}>({
  params: () => ({ query: this.selectedRegion() }),
  stream: ({ params }) => {
    if (!params.query) return of([]);
    return this.countryService.searchCountriesByRegion(params.query);
  },
  });

}
