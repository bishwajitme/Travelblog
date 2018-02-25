import { Location } from "./location";

export class Place {
  constructor(public title: string,
              public description: string,
              public location: Location,
              public imageUrl: string,
              public baseImagePath: string,
              public imageName: string,
              public dateTime: string) {
  }
}
