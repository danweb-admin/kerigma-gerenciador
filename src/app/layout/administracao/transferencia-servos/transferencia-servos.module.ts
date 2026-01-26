import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecanatoService } from '../../../shared/services/decanato.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TransferenciaServosPageComponent } from './containers/transferencia-servos-page.component';
import { TransferenciaServosRoutingModule } from './transferencia-servos-routing.module';
import { TranferenciaServosDialogComponent } from './components/dialog/transferencia-servos-dialog.component';
import { TranferenciaServosTableComponent } from './components/table/transferencia-servos-table.component';


@NgModule({
  declarations: [
      TransferenciaServosPageComponent,
      TranferenciaServosDialogComponent,
      TranferenciaServosTableComponent,
  ],
  imports: [
    CommonModule,
    TransferenciaServosRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  providers: [
    DecanatoService
  ]
})
export class TransferenciaServosModule { }
