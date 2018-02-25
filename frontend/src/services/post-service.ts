import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Posts {
 
  data: any;
  singledata:any;
 
  constructor(public http: Http) {
    this.data = null;
    this.singledata= null;
  }
 
  getposts(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('http://localhost:3000/api/posts')
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
 
      this.http.get('http://localhost:3000/posts/api/show/'+id)
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
    this.http.post('http://localhost:3000/posts/api/addcomment', JSON.stringify(newComment), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }

  addPost(newPost){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
   console.log(newPost);
    this.http.post('http://localhost:3000/posts/api/add', JSON.stringify(newPost), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteReview(id){
 
    this.http.delete('http://localhost:3000/api/reviews/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}