import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ShoppingHeaderComponent} from "./shopping-header/shopping-header.component";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

@NgModule({
    declarations: [
        AppComponent,
        ShoppingHeaderComponent,
    ],
    imports: [
        BrowserModule,
        NgOptimizedImage,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        CoreModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
