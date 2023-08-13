import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WeaterData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  data?:WeaterData;
  cityName:string = 'Grenoble';
  @ViewChild('form') form?:NgForm;
  currentStyles: Record<string,string> = {};
  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.getData(this.cityName);
    this.cityName="";
  }

  setCurrentStyles(is_day:number){
    this.currentStyles = {
      'background-image': is_day == 1 ? 'url("assets/day.jpg")':'url("assets/night.jpg")'
    }
  }

  onSubmit(){
    if(this.form?.valid){
      //console.log(this.cityName);
      this.getData(this.cityName);

    }else{
      alert('Veuillez saisir un nom valide');
    }

  }

  getData(cityName:string){
    this.weatherService.getWeatherData(cityName)
    .subscribe({
      next:(response)=>{
        this.data = response;
        this.setCurrentStyles(response.current.is_day)
        //console.log(response);
      },
      error(err) {
        //console.log(err);
        alert('Nom de ville saisie inexistant ou probléme technique, merci de réessayer plus tard');

      },
    });
  }


}
