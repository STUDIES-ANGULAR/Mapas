import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker: mapboxgl.Marker;
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    ` 
      .mapa-container {
        height: 100%;
        width: 100%;
      }

      .list-group{
        position:fixed;
        top: 20px;
        right:20px;
        z-index:9;
      }
      li{
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 15;
  center: [number, number] = [ -76.99872968556471, 3.87874066424086 ];

  // Arreglo de marcadores
  marcadores: MarcadorColor [] = [];

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


    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);

  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable:true,
      color
    })
      .setLngLat ( this.center )
      .addTo( this.mapa );


    this.marcadores.push( {
      color,
      marker: nuevoMarcador
    });
  }

  irAMarcador( marcador : mapboxgl.Marker ){
    this.mapa.flyTo({
        center: marcador.getLngLat()
    });
  }




  
}
