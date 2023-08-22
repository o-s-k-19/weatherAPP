import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WeaterData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }


  getWeatherData(cityName: string):Observable<WeaterData>{
    const options = {params: new HttpParams().set(environment.keyName, environment.keyValue).set(environment.qName,cityName).set(environment.lang,environment.french)}
    return this.httpClient.get<WeaterData>(environment.weatherApiBaseUrl+environment.currentWeatherApiMethod, options);
  }
}
