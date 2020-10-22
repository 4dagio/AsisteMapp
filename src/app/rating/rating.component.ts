import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/asiste-services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loading';
import { AlertService } from 'src/app/common/alert';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}


interface ServiceModel{
  lat: number;
  long: number;
  estado: any;
  colaborador: any;
  foto: any;
  servicio: any;
  logo: any;
  comentario: any;
  placa: any;
}

@Component({
  selector: 'app-rating',
  templateUrl: 'rating-component.html',
  styleUrls: ['rating-component.scss'],
})
export class RatingComponent {
  fromBaseURL: any;
  idService: any;
  isIdService: any;
  service: any;
  markers: Marker[] = [];
  map = null;
  foto : any;
  logoEmpresa : any;
  estado : any;
  myLatLng: any;
  colaborador : any;
  params: string;
  paramsData: any;
  public dataApi : ServiceModel; 
  lat: any;
  long: any;
  zoom = 12;
  id: string;
  isFinished = false;

  public placa: string;
  public comment: string;
  public calificacion: number;

  constructor(
    public api: ApiService,
    private rutaActiva: ActivatedRoute,
    public loading: LoadingService,
    public alertService: AlertService,
    public route: Router
    ) {}


  async ngOnInit(){
    this.idService = this.rutaActiva.snapshot.params.id;
    this.validateRating(this.idService);
  }

  onRateChange(rating){
    console.log('The evaluation was modified and now its value is: ', rating);
    this.calificacion = rating;
  }

  validateRating(id: string){
    this.api.reloadLocation(id).subscribe((data: ServiceModel) => {
      if(data.comentario === '1'){
        this.redirectFinish();
      } else {
        this.foto = data.foto;
        this.colaborador = data.colaborador;
        this.service = data.servicio;
        this.estado = data.estado;
        this.logoEmpresa = data.logo;
        this.placa = data.placa;
      }
    });
  }

  async sendCalification(){
      if(this.comment === undefined)
      {
        this.comment = '';
      }
      await this.api.sendRating(this.idService, this.calificacion, this.comment).subscribe((data: any) => {
      });
      this.alertService.presentAlert();
      this.route.navigate(['/location', this.idService]);
  }

  redirectFinish(){
    this.isFinished = true;
  }

}