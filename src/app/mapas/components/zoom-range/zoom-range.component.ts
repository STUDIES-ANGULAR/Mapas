import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit {

  //viewChild me sirve para tomar un elemento HTML y utilizarlo como una propiedad comun y corriente en el ts
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 10;

  constructor() { 
  }
  //AfterViewInit lo usamos para aprovechar que ya el componente se creo  y poder tomar la referecia  con el ViewChild
  //ya que este en el onInit y en el contructor seria undefined
  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -76.99872968556471, 3.87874066424086 ],
      zoom: this.zoomLevel
    });

    //on() es un listener de mapbox
    this.mapa.on('zoom', (event) => {
      this.zoomLevel = this.mapa.getZoom();
    })

    this.mapa.on('zoomend' , (ev) => {
      if ( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      }
    })
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
