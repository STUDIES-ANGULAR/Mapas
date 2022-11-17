import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [ number, number ];
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
    this.leerMarcadoresLocalStorage();

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

    this.guardarMarcadoresLocalStorage();
  }

  irAMarcador( marcador : mapboxgl.Marker ){
    this.mapa.flyTo({
        center: marcador.getLngLat()
    });
  }

  guardarMarcadoresLocalStorage(){
    
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {

      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [ lng, lat ]
      });
    });

    localStorage.setItem( 'marcadores', JSON.stringify(lngLatArr) );

  }

  leerMarcadoresLocalStorage() {
    //preguntamos si no existen marcodores
    if( !localStorage.getItem('marcadores') ){
      return;
    }

    const lngLatArr: MarcadorColor [] = JSON.parse( localStorage.getItem('marcadores')! );

    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.centro! )
        .addTo( this.mapa );

      //agregamos al listado de marcadores
      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

    });

  }



  
}
