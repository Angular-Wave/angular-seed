import { angular } from "@angular-wave/angular.ts";
import { PhotoController } from "./photo-controller.js";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
defineCustomElements(window);

angular
  .module("app", [])
  .config(($sceProvider) => {
    $sceProvider.enabled(false);
  })
  .controller("PhotoController", PhotoController);
