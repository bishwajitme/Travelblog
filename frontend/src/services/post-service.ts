import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
 
@Injectable()
export class Posts {
 
  data: any;
  singledata:any;

  constructor(public http: Http, private transfer: FileTransfer) {
    this.data = null;
    this.singledata= null;
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

 
  addComment(newComment){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
   console.log(newComment);
    this.http.post('https://trablog.herokuapp.com/posts/api/addcomment', JSON.stringify(newComment), {headers: headers})
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
 
  deletePost(id){
 
    this.http.delete('https://trablog.herokuapp.com/posts/api/delete/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}