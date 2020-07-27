import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isAlert = false;

  constructor(public alertController: AlertController) { }
  
  async present() {
    this.isAlert = true;
    return await this.alertController.create({
        header: 'Use this lightsaber?',
        message: 'Do you agree to use this lightsaber to do good across the galaxy?',
        buttons: ['Disagree', 'Agree']
    });

  }

  
}