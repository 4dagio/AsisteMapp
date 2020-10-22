import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { LocationComponent } from './location/location-component';
import { RatingComponent } from './rating/rating.component';

const APP_ROUTES: Routes = [
    { path: 'location/:params', component: LocationComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'location'},
    { path: 'rating/:id', component: RatingComponent}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});