import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            },
            {
                path: 'inicio',
                loadChildren: () => import('./inicio/inicio.module').then((m) => m.InicioModule)
            },
            {
                path: 'grupo-oracao',
                loadChildren: () => import('./grupo-oracao-table/grupo-oracao-table.module').then((m) => m.GrupoOracaoTableModule),
                canActivate: [AuthGuard]

            },
            {
                path: 'decanatos',
                loadChildren: () => import('./administracao/decanatos/decanatos.module').then((m) => m.DecanatosModule),
                canActivate: [AuthGuard]

            },
            {
                path: 'paroquias',
                loadChildren: () => import('./administracao/paroquias/paroquias.module').then((m) => m.ParoquiasModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'formacoes',
                loadChildren: () => import('./administracao/formacao/formacao.module').then((m) => m.FormacaoModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'confirmacao-servos',
                loadChildren: () => import('./administracao/servos-confirmation/servos-confirmation.module').then((m) => m.ServosConfirmationModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'lista-servos',
                loadChildren: () => import('./administracao/servos-list/servos-list.module').then((m) => m.ServosListModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'transferencia-servos',
                loadChildren: () => import('./administracao/transferencia-servos/transferencia-servos.module').then((m) => m.TransferenciaServosModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./administracao/usuarios/usuarios.module').then((m) => m.UsuariosModule),
                canActivate: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
