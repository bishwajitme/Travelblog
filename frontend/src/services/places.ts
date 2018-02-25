import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";

import { Place } from "../models/place";
import { Location } from "../models/location";
import { TwitterService } from 'ng2-twitter';
import { Base64 } from '@ionic-native/base64';
import {ToastController} from "ionic-angular";
import twit from 'twit';
//import { readFileSync} from 'fs';
//import fs from 'fs';
//import * as fs from 'fs';
//import { readFileSync} from 'fs';
declare var cordova: any;

@Injectable()
export class PlacesService {
    private places: Place[] = [];
    result = '';
    b64content = '';


    constructor(private storage: Storage, private file: File, private twitter: TwitterService, private base64: Base64,
                private toastCtrl: ToastController
    ) {}

    addPlace(title: string,
             description: string,
             location: Location,
             imageUrl: string,
             baseImagePath: string,
             imageName: string,
             dateTime:string = new Date().toISOString()) {
        const place = new Place(title, description, location, imageUrl, baseImagePath, imageName, dateTime);
        this.places.push(place);
        this.postTweet(title, location, imageUrl, baseImagePath, imageName);
        this.storage.set('places', this.places)
            .then()
            .catch(
                err => {
                    this.places.splice(this.places.indexOf(place), 1);
                }
            );
    }

    loadPlaces() {
        return this.places.slice();
    }

    fetchPlaces() {
        return this.storage.get('places')
            .then(
                (places: Place[]) => {
                    this.places = places != null ? places : [];
                    return this.places;
                }
            )
            .catch(
                err => console.log(err)
            );
    }

    deletePlace(index: number) {
        const place = this.places[index];
        this.places.splice(index, 1);
        this.storage.set('places', this.places)
            .then(
                () => {
                    this.removeFile(place);
                }
            )
            .catch(
                err => console.log(err)
            );
    }

    private removeFile(place: Place) {
        const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(
                () => console.log('Removed File')
            )
            .catch(
                () => {
                    console.log('Error while removing File');
                    //this.addPlace(place.title, place.description, place.location, place.imageUrl, place.dateTime);
                }
            );
    }

    postTweet(title, location, imageUrl, baseImagePath, imageName) {

        var config = {
            consumer_key: 'yYgrvxZtOnJfk8NDmv8GaiWoz',
            consumer_secret: 'jl9vvMWTq3jTwTLMfdpvNmDNLmHDRrakRXGLBSCoGXnELbvzay',
            access_token: '918029713645465601-JLAzfF2V5xLoocWECdY3LHtpHeyElec',
            access_token_secret: 'esV5TL0TvGb65iLfVlDyO15ZaeTAnXaI7YLdSyUbx9ptm'
        };
        var T = new twit(config);
        console.log('imageurl'+imageUrl);
       // var b64content = fs.readFileSync(imageUrl, {encoding: 'base64'})
        this.base64.encodeFile(imageUrl).then((base64File: string) => {
            //var baseString = '"'+base64File.slice(38, -5)+'"';
            console.log(base64File);
            T.post('media/upload', {media_data: base64File}, function (err, data, response) {
                // now we can assign alt text to the media, for use by screen readers and
                // other text-based presentations and interpreters
                if (!err) {
                    var mediaIdStr = data.media_id_string
                    var altText = "Small flowers in a planter on a sunny balcony, blossoming."
                    var meta_params = {media_id: mediaIdStr, alt_text: {text: altText}}
                }
                else{
                    console.log(err);
                }
                T.post('media/metadata/create', meta_params, function (err, data, response) {
                    if (!err) {
                        // now we can reference the media and post a tweet (media will attach to the tweet)
                        var params = {status: title, media_ids: [mediaIdStr]}

                        T.post('statuses/update', params, function (err, data, response) {
                            console.log(data);


                        })
                    }
                })
            })
        }, (err) => {
            console.log(err);
        });
    }


}
