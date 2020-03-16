import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const apiKey: string = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }
  
  getFiveDayForecast(lat: string, lon: string) : Observable<any> {
    return this.http.get(`${environment.apiUrl}/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`);
  }

}