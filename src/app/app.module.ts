import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LocationComponent } from './location/location-component';

//Routes
import { APP_ROUTING } from './app.routes';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    APP_ROUTING
    
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
