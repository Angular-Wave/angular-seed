import { angular } from "@angular-wave/angular.ts";

angular.module("version", []).controller(
  "VersionController",
  class VersionController {
    static $inject = ["$scope"];
    /** @param {ng.Scope} $scope */
    constructor($scope) {
      this.$scope = $scope;
    }
    version = angular.version;
  },
);

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hostname === "localhost") {
    const script = document.createElement("script");
    script.src =
      "http://localhost:3000/browser-sync/browser-sync-client.js?v=3.0.3";
    if (document.body) {
      document.body.appendChild(script);
    } else if (document.head) {
      document.head.appendChild(script);
    }
  }
});
