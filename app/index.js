import { angular } from "@angular-wave/angular.ts";
import { buttonDirective } from "./ui/button.js";

angular.module("ui", []).directive("button", buttonDirective);

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
