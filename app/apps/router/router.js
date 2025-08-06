import { angular } from "@angular-wave/angular.ts";

angular.module("router", []).config([
  "$stateProvider",
  "$locationProvider",
  ($stateProvider, $locationProvider) => {
    $locationProvider.html5ModeConf = {
      enabled: true,
      requireBase: false,
      rewriteLinks: false,
    };
    $stateProvider
      .state({
        name: "page1",
        url: "/page1",
        template: "<h3>Its the NG-Router hello world app!</h3>",
      })
      .state({
        name: "page2",
        url: "/page2",
        templateUrl: "/apps/router/_page2.html",
      })
      .state({
        name: "home",
        url: "/apps/router/router.html",
        templateUrl: "/apps/router/_home.html",
      });
  },
]);
