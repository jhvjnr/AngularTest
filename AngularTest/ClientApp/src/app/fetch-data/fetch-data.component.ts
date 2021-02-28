import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecastVO[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let body = JSON.stringify({ "key": "I made a post request" });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Accept":"text/plain" });
    let options = { headers: headers };

    http.post<WeatherForecastVO[]>(baseUrl + 'all-forecasts', body, options).subscribe(result => {
      console.warn(result);
      this.forecasts = result;
    }, error =>
      {
        console.warn("We hit an error");
        console.error(error);
    });



    http.post<RequestVO>(baseUrl + 'request-vo', body, options).subscribe(result => {
      console.warn(result);
    }, error => {
      console.warn("We hit an error");
      console.error(error);
    });

  }
}

interface WeatherForecastVO {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface RequestVO {
  key: string;
}
