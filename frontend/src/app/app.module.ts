import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlacePage } from "../pages/add-place/add-place";
import { PlacePage } from "../pages/place/place";
import { ShowPage } from "../pages/show/show";
import { SetLocationPage } from "../pages/set-location/set-location";
//import { AgmCoreModule } from "angular2-google-maps/core";
import { AgmCoreModule } from '@agm/core';
import { PlacesService } from "../services/places";
import {Posts}  from "../services/post-service";
import { TwitterService } from 'ng2-twitter';
import { Base64 } from '@ionic-native/base64';
import { FileTransfer } from '@ionic-native/file-transfer';
import {SocialSharing} from "@ionic-native/social-sharing";
import { WeatherProvider } from '../services/weather';
import { AuthService } from '../services/auth-service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LogoutPage } from '../pages/logout/logout';
import {CategoryPage} from "../pages/category/category";
import {ContactPage} from "../pages/contact/contact";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    ShowPage,
    LoginPage,
    RegisterPage,
      LoginPage,
      LogoutPage,
      CategoryPage,
      ContactPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBy1xOdJUZRt5aqPjUJugh0eWETvHlgpXA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage,
    ShowPage,
    LoginPage,
    RegisterPage,
      LogoutPage,
      CategoryPage,
      ContactPage
  ],
  providers: [
      SocialSharing,
    File,
    Camera,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesService,
      TwitterService,
      Base64,
      Posts,
      FileTransfer,
      WeatherProvider,
      AuthService
  ]
})
export class AppModule {
}
