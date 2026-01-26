import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferenciaServosPageComponent } from './containers/transferencia-servos-page.component';

const routes: Routes = [
    {
        path: '',
        component: TransferenciaServosPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransferenciaServosRoutingModule {}
