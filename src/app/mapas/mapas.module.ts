import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MiniMapasComponent } from './components/mini-mapas/mini-mapas.component';
import { FullScreenComponent } from './components/full-screen/full-screen.component';
import { MarcadoresComponent } from './components/marcadores/marcadores.component';
import { ZoomRangeComponent } from './components/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';


@NgModule({
  declarations: [
    MiniMapasComponent,
    FullScreenComponent,
    MarcadoresComponent,
    ZoomRangeComponent,
    PropiedadesComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
