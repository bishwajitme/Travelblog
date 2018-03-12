import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth-service';
import { RegisterPage } from '../register/register';
import {HomePage} from "../home/home";
import { Storage } from "@ionic/storage";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    loading: any;
    loginData = { username:'', password:'' };
    data: any;
    isNotLoggedIn: boolean = true;
    isLoggedIn: boolean = false;

    constructor(private storage: Storage, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController)
    {
        this.storage.get('token').then((val) => {
            if(val!="" && val!= null){
                this.isNotLoggedIn = false;
                this.isLoggedIn = true;
            }
        });
    }

    doLogin() {

        //this.showLoader();
        if (this.loginData.username == 'admin' && this.loginData.password == '12345') {
          //  this.data.access_token = '123445555666666';
            //localStorage.setItem('token', this.data.access_token);
            this.storage.set('token', '123445555666666');
            this.navCtrl.setRoot(HomePage);
            /* this.authService.login(this.loginData).then((result) => {
                 this.loading.dismiss();
                 this.data = result;
                 localStorage.setItem('token', this.data.access_token);
                 this.navCtrl.setRoot(HomePage);
             }, (err) => {
                 this.loading.dismiss();
                 this.presentToast(err);
             });*/
        }
        else{
            this.presentToast('Login Details Invalid');
            this.loading.dismiss();
        }
    }

    register() {
        this.navCtrl.push(RegisterPage);
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}