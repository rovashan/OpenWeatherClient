import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherModel } from './weather.model';

declare var places: any;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  lat = '';
  lng = '';

  weatherForecast: WeatherModel[] = [];
  places: any;

  constructor(private weatherService: WeatherService) { }


  ngOnInit() {
    this.setupAutocomplete();
    //this.seedData();
    //this.getForecast();
  }

  seedData() {
    for (let i = 0; i < 5; i++) {
      this.weatherForecast.push(
        new WeatherModel(
          '16-03-2020',
          '19',
          '25',
          '10d'
        )
      )
    }
  }

  setupAutocomplete() {
    const placesAutocomplete = places({
      appId: 'plXQEW8KV1RK',
      apiKey: '3b8a62a3d5e5b4204c39109a06e1738e',
      container: document.querySelector('#address-input')
    });

    placesAutocomplete.on('change', e => this.setGpsCoordinates(e));
  }

  getForecast() {
    this.weatherService.getFiveDayForecast(this.lat, this.lng).subscribe(
      res => {
        console.log(res);
        this.weatherForecast = [];
        
        for (let i = 0; i < res.list.length; i += 8) {

          let date = res.list[i].dt_txt.split(' ')[0];

          const tmp = new WeatherModel(
            date,
            res.list[i].main.temp_min,
            res.list[i].main.temp_max,
            res.list[i].weather[0].icon
          )

          this.weatherForecast.push(tmp);
        }

        console.log(this.weatherForecast);
      }
    )
  }

  setGpsCoordinates(e) {
    console.log(e);

    this.lat = e.suggestion.latlng.lat; 
    this.lng = e.suggestion.latlng.lng; 
    
    console.log(this.lat, this.lng);
  }

}
