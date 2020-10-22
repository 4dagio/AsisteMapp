import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LocationComponent } from './location/location-component';
import { RatingComponent } from './rating/rating.component';
import { IonicRatingModule } from 'ionic-rating';

//Routes
import { APP_ROUTING } from './app.routes';
import { IonicModule, AlertController } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    RatingComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicRatingModule,
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    APP_ROUTING
    
  ],
  providers: [AlertController],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
