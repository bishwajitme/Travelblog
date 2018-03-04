import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ToastController } from "ionic-angular";
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places";
import { Posts } from "../../services/post-service";
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {
place: Place;
post: Posts[] = [];
  id: number = null;
  postid : number;


  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private viewCtrl: ViewController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private postService: Posts) {
 
  }
   ngOnInit() {
    
     this.id = this.navParams.get('id');
     console.log('id:'+this.id);
  this.postService.getpost(this.id).then((data) => {
      this.post = data;
      this.postid = data._id;
      var str = JSON.stringify(data, null, 2); 
      console.log('single data: '+str);
     
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
    this.onLeave();
  }
}
