import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
    apiKey = '99dfe35fcb7de1ee';
    url;

    constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';
}

getWeather(lat, lng){
    return this.http.get(this.url+'/'+lat+','+lng+'.json')
        .map(res => res.json());
}

}
