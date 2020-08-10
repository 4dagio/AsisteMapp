import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isAlert = false;

  constructor(public alertController: AlertController) { }
  
 //prepare and call function to use
async presentAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,  
      animated: true,
      header: 'El servicio ya finalizo.'
      
    });

    await alert.present();
  }
    

  }

