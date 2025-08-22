import { angular } from "@angular-wave/angular.ts";
import { PhotoController } from "./photo-controller.js";
import { defineCustomElements as defineIonic } from "@ionic/core/loader";
import { defineCustomElements as definePwa } from "@ionic/pwa-elements/loader";
import { addIcons } from "ionicons";
import { camera, images } from "ionicons/icons";

addIcons({ camera, images });
defineIonic(window);
definePwa(window);

angular
  .module("app", [])
  .config(($sceProvider) => {
    $sceProvider.enabled(false);
  })
  .controller("PhotoController", PhotoController);
