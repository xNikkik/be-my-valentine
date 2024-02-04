import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppScene } from "./app.scene";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule, 
        AppRoutingModule
    ],
    providers: [AppScene],
    bootstrap: [AppComponent]
})
export class AppModule {}