import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Markerinfo } from "../interfaces/markerinfo";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { ApiService } from "../services/api.service";
import {
  PictureSourceType,
  Camera,
  DestinationType
} from "@ionic-native/Camera/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-detailmonument",
  templateUrl: "./detailmonument.page.html",
  styleUrls: ["./detailmonument.page.scss"]
})
export class DetailmonumentPage implements OnInit {
  public monument: Markerinfo;
  public image: string;
  url = "https://ionicacademy.com";
  constructor(
    private route: ActivatedRoute,
    private callNumber: CallNumber,
    private _apiService: ApiService,
    private Camera: Camera,
    private socialSharing: SocialSharing,
    private file: File
  ) {
    this.route.params.subscribe(params => {
      const object = JSON.parse(params["object"]);
      this._apiService.placesLatLong.forEach(element => {
        if (element.getId() === object.id) {
          this.monument = element;
        }
      });
    });
  }

  ngOnInit() {}

  // Function use to make a call if the monument have it available
  makeCall(telefono: string) {
    this.callNumber
      .callNumber(telefono, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
  }

  // Functio to change the state if a monument is visited or not
  changeVisitado(value: boolean) {
    this.monument.setVisitado(!value);
    if (!value === true) {
      this._apiService.visitedPlaces.push(this.monument);
    } else {
      this._apiService.removeFromvisitedPlaces(this.monument);
    }
  }

  takePicture() {
    this.Camera.getPicture({
      destinationType: this.Camera.DestinationType.DATA_URL,
      targetWidth: 320,
      targetHeight: 320
    }).then(
      data => {
        this.image = "data:image/jpeg;base64," + data;
        this._apiService.addImageToMonument(this.image, this.monument);
        console.log(this.monument);
      },
      error => {
        console.log(error);
      }
    );
  }

  async shareTwitter(image: string) {
    const text = `Fotografía del monumento ${
      this.monument.nombre
    } sacada con GoVLC`;
    this.socialSharing
      .shareViaTwitter(text, this.image, null)
      .then(() => {
        // Success
      })
      .catch(e => {
        // Error!
      });
  }

  async shareWhatsApp(image: string) {
    const text = `Fotografía del monumento ${
      this.monument.nombre
    } sacada con GoVLC`;
    this.socialSharing
      .shareViaWhatsApp(text, this.image, null)
      .then(() => {
        // Success
      })
      .catch(e => {
        // Error!
      });
  }
}
