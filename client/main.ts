import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppModule } from "../imports/client/components/app.module";

Meteor.startup( () => {
  if (Meteor.isProduction) {
    enableProdMode();
  }
  platformBrowserDynamic().bootstrapModule(AppModule);
});
