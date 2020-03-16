import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherModel } from './weather.model';

declare var places:  any;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  lat = '-26.204103';
  lon = '28.047304';

  weatherForecast: WeatherModel[] = [];
  places: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    const placesAutocomplete = places({
      appId: 'plXQEW8KV1RK',
      apiKey: '3b8a62a3d5e5b4204c39109a06e1738e',
      container: document.querySelector('#address-input')
    });

    placesAutocomplete.on('change', e => this.setGpsCoordinates(e) );

    placesAutocomplete.on('change', e => this.setGpsCoordinates(e) );

    this.weatherService.getFiveDayForecast(this.lat, this.lon).subscribe(
      res => {
        console.log(res);
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
    console.log(e.suggestion);

  }

}
