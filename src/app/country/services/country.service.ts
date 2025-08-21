import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, delay, of, tap } from 'rxjs';

import type { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mapper/country.mapper';
import { Region } from '../types/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    // If the data is in the cache return this
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(countries => CountryMapper.mapRestCountriesArrayToCountriesArray(countries)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      delay(1500),
      catchError((err: Error) => {
        return throwError(() => new Error(`Error fetching countries with query ${query}`));
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(countries => CountryMapper.mapRestCountriesArrayToCountriesArray(countries)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(1500),
      catchError((err: Error) => {
        return throwError(() => new Error(`Error fetching country with query ${query}`));
      })
    )
  }

  searchCountryByCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map(countries => CountryMapper.mapRestCountriesArrayToCountriesArray(countries)),
      map(countries => countries.at(0)),
      delay(1500),
      catchError((err: Error) => {
        return throwError(() => new Error(`Error fetching country with query ${code}`));
      })
    )
  }

  searchCountriesByRegion(region: Region) {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
      map(countries => CountryMapper.mapRestCountriesArrayToCountriesArray(countries)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      delay(1500),
      catchError((err: Error) => {
        return throwError(() => new Error(`Error fetching countries with region ${region}`));
      })
    )
  }
}
