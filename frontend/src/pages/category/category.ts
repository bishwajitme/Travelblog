import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {ModalController, LoadingController, ToastController, ViewController, NavController,
    Events} from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Posts } from "../../services/post-service";
import { Storage } from "@ionic/storage";
import {HomePage} from "../home/home";
import {AlertController} from "ionic-angular";
//import {LoginPage} from "../login/login";


declare var cordova: any;

@Component({
    selector: 'page-category',
    templateUrl: 'category.html'
})
export class CategoryPage {

    isLoggedIn: boolean = false;


    constructor(private modalCtrl: ModalController,
                private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private geolocation: Geolocation,
                private camera: Camera,
                private file: File,
                private storage: Storage,
                private postService: Posts,
                private alertCtrl: AlertController,
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

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Category just created',
      subTitle: 'You can see it in the list of categories',
      buttons: ['OK']
    });
    alert.present();
  }

    onSubmit(form: NgForm) {
        let newCat = {
            name: form.value.name,
        };
        console.log('cat data: '+newCat);
        this.postService.addCategory(newCat);
        form.reset();

        const toast = this.toastCtrl.create({
            message: 'Category added!',
            duration: 1500
        });
        toast.present();
        this.navCtrl.setRoot(HomePage);
    }
    goToHomePage()
    {
        this.events.publish('reloadPage1');
        //this.navCtrl.pop();
        //this.navCtrl.setRoot(HomePage);
    }

    dismiss() {
        this.viewCtrl.dismiss();

    }
}
