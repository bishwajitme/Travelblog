import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
 
@Injectable()
export class Posts {
 
  data: any;
  singledata:any;
  catData: any;
  newCatData:any;

  constructor(public http: Http, private transfer: FileTransfer) {
    this.data = null;
    this.singledata= null;
    this.catData = null;
  }
 
  getposts(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('https://trablog.herokuapp.com/api/posts')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

   getpost(id){
  this.singledata = null;
    if (this.singledata) {
      return Promise.resolve(this.singledata);
    }
 
    return new Promise(resolve => {
 
      this.http.get('https://trablog.herokuapp.com/posts/api/show/'+id)
        .map(res => res.json())
        .subscribe(singledata => {
          this.singledata = singledata;
          resolve(this.singledata);
        });
    });
 
  }


    getCategories(){

        if (this.catData) {
            return Promise.resolve(this.catData);
        }

        return new Promise(resolve => {

            this.http.get('https://trablog.herokuapp.com/categories/api/categories')
                .map(res => res.json())
                .subscribe(data => {
                    this.catData = data;
                    resolve(this.catData);
                });
        });

    }


 
  addComment(newComment){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
   console.log(newComment);
    this.http.post('https://trablog.herokuapp.com/posts/api/addcomment', JSON.stringify(newComment), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }

    addContact(newContact){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(newContact);
        this.http.post('https://trablog.herokuapp.com/users/contact', JSON.stringify(newContact), {headers: headers})
            .subscribe(res => {
                console.log(res.json());
            });

    }



    uploadImage(img, newPost) {

        // Destination URL
        let url = 'https://trablog.herokuapp.com/posts/api/add';

        // File for Upload
        var targetPath = img;

        const fileTransfer: FileTransferObject = this.transfer.create();
        var options: FileUploadOptions = {
            fileKey: 'image',
            chunkedMode: false,
            mimeType: 'multipart/form-data',
            headers: {},
            params: newPost
        };



        // Use the FileTransfer to upload the image
        return fileTransfer.upload(targetPath, url, options);
    }



  addPost(newPost){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
   console.log(newPost);
    this.http.post('https://trablog.herokuapp.com/posts/api/add', JSON.stringify(newPost), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }

    addCategory(newCat){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(newCat);
        this.http.post('https://trablog.herokuapp.com/categories/api/add', JSON.stringify(newCat), {headers: headers})
            .subscribe(res => {
                console.log(res.json());

            });
    }
 
  deletePost(id){
 
    this.http.delete('https://trablog.herokuapp.com/posts/api/delete/' + id).subscribe((res) => {
      console.log(res.json());
    });
      return 'deleted';
  }
 
}