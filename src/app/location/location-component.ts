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
  code: any;
}

export class StatusServiceModel{
  buscando : boolean;
  pendiente : boolean;
  encontrado : boolean;
  encamino : boolean; 
  enservicio: boolean;
  terminado: boolean;
}

@Component({
  selector: 'app-location',
  templateUrl: 'location-component.html',
  styleUrls: ['location-component.scss'],
})
export class LocationComponent {
  public status : StatusServiceModel;
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
  isFinished: boolean = false;

  constructor(
    public api: ApiService, 
    private rutaActiva: ActivatedRoute,
    public loading: LoadingService,
    public alertService: AlertService,
    public route: Router) {}

  async ngOnInit(){
    console.log("que pasa");
    this.status = new StatusServiceModel();
    this.status.buscando = true;
    this.isIdService = this.isBase64(this.rutaActiva.snapshot.params.params);

    if(this.isIdService){
      let params = atob(this.rutaActiva.snapshot.params.params);
      let paramsFormat = params.split('|');
      this.idService = paramsFormat[6];
    }else {
      this.idService = this.rutaActiva.snapshot.params.params;
    };

    this.api.reloadLocation(this.idService).subscribe((data: ServiceModel) => {
      console.log(data);     
      if(data.estado === 'Terminado' && data.comentario === '0'){
          this.route.navigate(['/rating', this.idService]);
        }
      if(data.code === 401){
        data.estado = "Terminado";
      }  
      if(data.estado === 'Terminado'){
        this.isFinished = true;
        this.logoEmpresa = data.logo;
        }else{
          this.isFinished = false;
            this.loading.present();
            this.loadMap(this.idService);
            setInterval(() => {
            this.renderMarkers(this.idService);
            if(this.loading.isLoading){
              this.loading.dismiss();
              } else {
                this.loading.present();
            }
          }, 30000);}
        })
  }

  async loadMap(id) {
     // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 4.570868 , lng: -74.297333};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 10
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers(id);
      mapEle.classList.add('show-map');
    });
  }

  async renderMarkers(str) {
    if(this.estado == undefined || this.estado == 'Fuera de linea' || this.estado == 'Pendiente' || this.estado == 'En curso'
       ||this.estado == "Ejecución" || this.estado.includes('Pendiente')) {
       
      this.api.reloadLocation(str).subscribe((data: ServiceModel) => {
        this.markers =  [
          {
            position: {
              lat: data.lat,
              lng: data.long,
            },
            title: data.colaborador
          }
        ]
        
        let mapEle: HTMLElement = document.getElementById('map');
        if(!data.lat || !data.long ){
          this.myLatLng = {lat: 4.570868, lng: -74.297333}; 
        }else{
        this.myLatLng = {lat: data.lat, lng: data.long};
       
        this.foto = data.foto;
        this.colaborador = data.colaborador;
        this.service = data.servicio;
        this.estado = data.estado;
        this.logoEmpresa = data.logo;
        this.map = new google.maps.Map(mapEle, {
          center: this.myLatLng,
          zoom: 16
        });
        
        this.markers.forEach(marker => {
          this.addMarker(marker);
        });
        //Estados
        if(data.estado == 'Fuera de linea' || data.estado == 'Pendiente' ){
          this.status.encontrado = true;
          this.loading.dismiss();
          return;
        }
    
        if(data.estado == 'En curso'){
          this.status.encontrado = true;
          this.status.encamino = true;
          this.loading.dismiss();
          return;
        }
    
        if(data.estado == "Ejecución"){
          
          this.status.encontrado = true;
          this.status.encamino = true;
          this.status.enservicio = true;
          this.loading.dismiss();
          return;
        }

        if(data.estado === 'Terminado' || data.estado === "Fallido"){
          this.status.encontrado = true;
          this.status.encamino = true;
          this.status.enservicio = true;
          this.status.terminado = true;
          this.loading.dismiss();
          // this.alertService.presentAlert();
          this.route.navigate(['/rating', this.idService]);
          return;
          }
        }
        err => {
          console.error(err);
          console.log(err);
        }
        });
      }else{
        console.log("Estado: Terminado");
      } 
  }

  async addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

  isBase64(str) {
    return  btoa(atob(str)) == str;
  }
}