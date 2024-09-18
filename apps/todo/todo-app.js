import "@angular-wave/angular.ts";
import TodoController from "./todo-ctl";

/**
 * AngularTS is a multi-paradigm framework that can be adjusted to meet any style.
 * This app features a single controller in a style of Stimilus.js (https://stimulus.hotwired.dev/).
 * Its a great way to inject custom DOM behaviour into your server-rendered views.
 */

window.angular
  .module("todo", [])
  .controller("TodoCtrl", TodoController)
  .directive("ngWatch", () => {
    return {
      restrict: "A",

      scope: {
        ngModel: "=",
        ngWatch: "=",
      },
      link: (scope, element, attrs, ngModelCtrl) => {
        scope.$watch("ngModel", function (newValue) {
          if (newValue !== scope.ngWatch) {
            scope.ngWatch = newValue;
            // Update the checkbox checked state
            element.checked = newValue;
          }
        });

        // Watch the ngWatch for changes and update the model
        scope.$watch("ngWatch", function (newValue) {
          debugger;
          if (newValue !== scope.ngModel) {
            scope.ngModel = newValue;
            // Update the ngModel value
            ngModelCtrl.$setViewValue(newValue);
          }
        });
      },
    };
  });
