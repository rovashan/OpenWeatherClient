import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherModel } from './weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  lat = '-26.204103';
  lon = '28.047304';

  weatherForecast: WeatherModel[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getFiveDayForecast(this.lat, this.lon).subscribe(
      res => {
        console.log(res);
        for (let i=0; i < res.list.length; i+=8) {

          const tmp = new WeatherModel(
            res.list[i].dt_txt,
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

}
