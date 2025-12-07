import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Formacao } from '../../../../../shared/models/formacao';
import { ServosConfirmationDialogComponent } from '../servos-confirmation-dialog/servos-confirmation-dialog.component';
import { GrupoOracaoService } from '../../../../../shared/services/grupo-oracao.service';
import { GrupoOracao } from '../../../../../shared/models/grupo-oracao';
import { Servo } from '../../../../../shared/models/servo';
import { ServoTempService } from '../../../../../shared/services/servo-temp.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servos-confirmation-table',
  templateUrl: './servos-confirmation-table.component.html',
  styleUrls: ['./servos-confirmation-table.component.scss']
})
export class ServosConfirmationTableComponent implements OnInit {
  
    closeResult = '';
    public dataSource: GrupoOracao[] = [];

    constructor(private modalService: NgbModal, 
                private servoTempService: ServoTempService,
                private grupoOracaoService: GrupoOracaoService,
                private toastService: ToastrService
        ) {
    }

    public ngOnInit(): void {
        this.loadGrupos('');
    }

    loadGrupos(search: string){
        this.grupoOracaoService.loadGrupos(true, search).subscribe((resp: GrupoOracao[]) => {
            this.dataSource = resp;
        });
    }

    checked(id: string, item){
        
        let servoTemp = {
            id: id
        } as unknown as Servo;

        this.servoTempService.checked(servoTemp).subscribe(() => {
            this.toastService.success('Servo(a) validado com sucesso!');
            item.checked = true;
        }, (error: any) => {
            if (error?.message.match('CPF')){
                item.checked = true;

            }
        })

    }

    delete(id: string, item){
        
        let servoTemp = {
            id: id
        } as unknown as Servo;

        this.servoTempService.delete(id).subscribe(() => {
            debugger
            this.toastService.success('Cadastro removido com sucesso!');
            item.checked = true;
        }, (error: any) => {
            if (error?.message.match('CPF')){
                item.checked = true;

            }
        })

    }

    openDialog(item: Servo){
        if (item.checked){
            this.toastService.error('Este(a) servo(a) já foi validado');
            return;
        }

        const modalRef = this.modalService.open(ServosConfirmationDialogComponent, { size: 'lg' })
        modalRef.componentInstance.servo = item;
        modalRef.componentInstance.grupo_oracao_id = item.grupoOracaoId;
        modalRef.result.then(res=>{
            console.log(res);
            
            item.checked = true;
            item.birthday = res.birthday;
        },dismiss=>{
            console.log("Cross Button",dismiss)
        })
    }

    // openDialogFormacoes(){
    //     const modalRef = this.modalService.open(FormacoesDialogComponent, {'size': 'lg'})
    //     modalRef.result.then(res=>{
    //         this.loadFormacoes();
    //     },dismiss=>{
    //     console.log("Cross Button",dismiss)
    //     })
    // }
}