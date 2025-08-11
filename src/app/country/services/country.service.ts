import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(countries => CountryMapper.mapRestCountriesArrayToCountriesArray(countries)),
      catchError((err: Error) => {
        return throwError(() => new Error(`Error fetching countries with query ${query}`));
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(countries => CountryMapper.mapRestCountriesArrayToCountriesArray(countries)),
      delay(1500),
      catchError((err: Error) => {
        return throwError(() => new Error(`Error fetching country with query ${query}`));
      })
    )
  }
}
