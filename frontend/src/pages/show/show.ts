import { Component } from '@angular/core';
import {Events, NavController, NavParams, ViewController} from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ToastController } from "ionic-angular";
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places";
import { Posts } from "../../services/post-service";
import { SocialSharing } from '@ionic-native/social-sharing';
import {Platform} from "ionic-angular";
import { WeatherProvider } from '../../services/weather';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {
place: Place;
post: Posts[] = [];
  id: number = null;
  postid : number;
  weather:any;
  lat:any;
  lng:any;
  postDate:any;
    isLoggedIn: boolean = false;


  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private viewCtrl: ViewController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private weatherProvider: WeatherProvider,
              private socialSharing: SocialSharing,
              private platform: Platform,
              private storage: Storage,
              public events: Events,
              private postService: Posts) {
      this.storage.get('token').then((val) => {
          if(val!="" && val!= null){
              this.isLoggedIn = true;
          }
      });
 
  }
   ngOnInit() {
    
     this.id = this.navParams.get('id');
     console.log('id:'+this.id);
  this.postService.getpost(this.id).then((data) => {
      this.post = data;
      this.postid = data._id;
     let newloc = JSON.parse(data.location);
     this.lat = newloc.lat;
      this.lng = newloc.lng;
      this.postDate = new Date(data.date).toISOString();
      this.weatherProvider.getWeather(this.lat, this.lng)  .subscribe(weather => {
          this.weather = weather.current_observation;
          console.log('weater: '+this.weather);
      });
    });

  this.id = null;
}

 onSubmit(form: NgForm) {
  let newComment = {
      postid: this.postid,
      name: form.value.name,
      body: form.value.body,
      email: form.value.email
    };
    console.log('comment data: '+newComment);
    this.postService
      .addComment(newComment);
    form.reset();
    const toast = this.toastCtrl.create({
            message: 'Comment!',
            duration: 2500
          });
          toast.present();
    this.navCtrl.pop();
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete(id) {
    this.postService.deletePost(id);
    //this.onLeave();
      const toast = this.toastCtrl.create({
          message: 'Deleted!',
          duration: 500
      });
      toast.present();
      //this.navCtrl.pop();
      this.events.publish('reloadPage1');
  }

    sharePost(title, src, id)
    {
       let imageUrl = 'https://trablog.herokuapp.com/images/'+src+'.jpg';
        let postUrl = 'https://trablog.herokuapp.com/posts/show/'+id;
        this.platform.ready()
            .then(() =>
            {
                console.log('title: '+title);
                console.log('img: '+imageUrl);
                //this.socialSharing.shareViaFacebook( message, image, message)
                this.socialSharing.share(title, title, imageUrl, postUrl)
                    .then((data) =>
                    {
                        console.log('Shared');
                    })
                    .catch((err) =>
                    {
                        console.log('Was not shared');
                    })


            });

    }
}
