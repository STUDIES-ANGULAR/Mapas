import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    ` 
      .mapa-container {
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 15;
  center: [number, number] = [ -76.99872968556471, 3.87874066424086 ];


  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //agregar elemento personalizado al marcador
    // const markerHTML: HTMLElement = document.createElement('div');
    // markerHTML.innerHTML = 'Hola Mundo';

    // const marker = new mapboxgl.Marker({
    //   element: markerHTML
    // })
    //         .setLngLat( this.center )
    //         .addTo( this.mapa );


    const marker = new mapboxgl.Marker()
            .setLngLat( this.center )
            .addTo( this.mapa );

  }



  
}
