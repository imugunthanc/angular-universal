import { NgModule } from "@angular/core";
import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
import { ServerModule } from "@angular/platform-server";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UniversalInterceptor } from "./universal-interceptor";
import { ModuleMapLoaderModule } from "@nguniversal/module-map-ngfactory-loader";

@NgModule({
  imports: [AppModule, ServerModule, ModuleMapLoaderModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule {}
