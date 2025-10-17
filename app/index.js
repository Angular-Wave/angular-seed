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
