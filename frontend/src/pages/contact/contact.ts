import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {
  ModalController, LoadingController, ToastController, ViewController, NavController,
  Events, AlertController
} from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Posts } from "../../services/post-service";
import { Storage } from "@ionic/storage";
//import {HomePage} from "../home/home";



declare var cordova: any;

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {

    isLoggedIn: boolean = false;


    constructor(private modalCtrl: ModalController,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                private geolocation: Geolocation,
                private camera: Camera,
                private file: File,
                private storage: Storage,
                private postService: Posts,
                private viewCtrl: ViewController,
                private navCtrl: NavController,
                public events: Events
    ) {

        this.storage.get('token').then((val) => {
            if(val!="" && val!= null){
                this.isLoggedIn = true;
            }
        });
    }

    onSubmit(form: NgForm) {
        let newContact = {
            name: form.value.name,
            body: form.value.message,
            email: form.value.email
        };
        console.log('comment data: '+newContact);
        this.postService
            .addContact(newContact);
        form.reset();

        const toast = this.toastCtrl.create({
            message: 'Message Submitted!',
            duration: 2500
        });
        toast.present();
       // this.navCtrl.setRoot(HomePage);
    }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Message Sent',
      subTitle: 'We will do our best answering all the messages.',
      buttons: ['OK']
    });
    alert.present();
  }


    dismiss() {
        this.viewCtrl.dismiss();

    }
}
