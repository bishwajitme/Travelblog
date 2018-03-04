import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController, ViewController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { PlacesService } from "../../services/places";
import { Posts } from "../../services/post-service";
//import {normalizeURL} from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';
  baseImagePath = '';
  imageName = '';
  post: Posts[] = [];


  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
              private postService: Posts,
              private viewCtrl: ViewController
              ) {
  }

  onSubmit(form: NgForm) {
    let newPost = {
      title: form.value.title,
      body: form.value.body,
      category: 'Europe',
      location:this.location

    };
    console.log('post data: '+newPost);
    this.postService
      .uploadImage(this.imageUrl, newPost).then(res => {
        this.viewCtrl.dismiss({reload: true});
    }, err => {
        this.dismiss();
    });

    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;

    const toast = this.toastCtrl.create({
            message: 'Post added!',
            duration: 2500
          });
          toast.present();
    //this.navCtrl.pop();
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could not get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        }
      );
  }

  onTakePhoto() {
    this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: false,
        correctOrientation: true
    })
      .then(
        imageData => {

          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.png';
          this.baseImagePath = path + currentName;
          this.imageName = newFileName;

         /* console.log(imageData);
            this.postService.uploadImage(imageData, 'image').then(res => {
                //var str = JSON.stringify(res.response, null, 2);
                let imageFile = JSON.parse(res.response);
                this.imageName = imageFile.image;
                console.log(this.imageName);
                console.log(res.response);
            }, err => {
                var str = JSON.stringify(err, null, 2);
                console.log('err'+ str);
            });
*/
        /*  this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
                .then(
              (data: Entry) => {
                //this.imageUrl = normalizeURL(data.nativeURL);

                  this.imageUrl = data.nativeURL;
                  console.log('data:'+ data);
                this.camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl = '';
                const toast = this.toastCtrl.create({
                  message: 'Could not save the image. Please try again',
                  duration: 2500
                });
                toast.present();
                this.camera.cleanup();
              }
            );*/
          //this.imageUrl = normalizeURL(this.imageUrl);
            this.imageUrl = imageData;
        }
      )
      .catch(
        err => {
            console.log(err);
          const toast = this.toastCtrl.create({
            message: 'Could not take the image. Please try again',
            duration: 2500
          });
          toast.present();
        }
      );
  }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
