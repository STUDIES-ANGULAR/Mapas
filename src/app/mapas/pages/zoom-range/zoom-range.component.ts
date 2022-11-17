import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  //viewChild me sirve para tomar un elemento HTML y utilizarlo como una propiedad comun y corriente en el ts
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 10;
  center: [number, number] = [ -76.99872968556471, 3.87874066424086 ];

  constructor() { 
  }

  ngOnDestroy(): void {
    //Destruimos los on-Listener
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }
  //AfterViewInit lo usamos para aprovechar que ya el componente se creo  y poder tomar la referecia  con el ViewChild
  //ya que este en el onInit y en el contructor seria undefined
  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //on() es un listener de mapbox
    this.mapa.on('zoom', (event) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend' , (ev) => {
      if ( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      }
    });

    
    //Movimiento del mapa
    this.mapa.on( 'move', (event) =>{
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [ lng, lat]
    });

  }

  zoomOut(){
    this.mapa.zoomOut();
  }
  
  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio( valor : string){
    this.mapa.zoomTo( Number(valor));
  }

}
