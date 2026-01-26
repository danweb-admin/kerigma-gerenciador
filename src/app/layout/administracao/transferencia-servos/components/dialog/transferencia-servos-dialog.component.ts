import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ServoService } from '../../../../../shared/services/servo.service';
import { GrupoOracaoService } from '../../../../../shared/services/grupo-oracao.service';
import { TransferenciaServosService } from '../../../../../shared/services/transferencia-servo.service';
import { ToastrService } from 'ngx-toastr';

interface Servo {
    id: number;
    nome: string;
}

@Component({
    selector: 'app-transferencia-servos-dialog',
    templateUrl: './transferencia-servos-dialog.component.html',
    styleUrls: ['./transferencia-servos-dialog.component.scss']
})
export class TranferenciaServosDialogComponent implements OnInit {
    
    form!: FormGroup;
    servosFiltrados: any[] = [];
    mostrarLista = false;
    mostrarListaGrupo = false;
    grupoOracaoFiltrados: any[] = [];
    
    constructor(
        private fb: FormBuilder,
        public activeModal: NgbActiveModal,
        private servoService: ServoService,
        private grupoOracaoService: GrupoOracaoService,
        private service: TransferenciaServosService,
        private toastr: ToastrService
    ) {}
    
    
    ngOnInit(): void {
        this.form = this.fb.group({
            nomeServo: ['', Validators.required],
            servoId: [],
            grupoOracaoAntigoId: [],
            grupoOracao: ['', Validators.required],
            grupoOracaoId: [],
            solicitado: ['', Validators.required]
        });
        
        // 🔥 AUTOCOMPLETE COM DEBOUNCE
        this.form.get('nomeServo')!
        .valueChanges
        .pipe(
            debounceTime(400),            // ⏱ espera parar de digitar
            distinctUntilChanged(),       // 🔁 evita repetir chamadas
            switchMap((valor: string) => {
                
                if (!valor || valor.length < 3) {
                    this.mostrarLista = false;
                    return of([]);
                }
                
                this.mostrarLista = true;
                return this.servoService.loadServos(valor.toUpperCase());
            })
        )
        .subscribe((resp: Servo[]) => {
            this.servosFiltrados = resp;
        });
        
        // 🔥 AUTOCOMPLETE COM DEBOUNCE
        this.form.get('grupoOracao')!
        .valueChanges
        .pipe(
            debounceTime(400),            // ⏱ espera parar de digitar
            distinctUntilChanged(),       // 🔁 evita repetir chamadas
            switchMap((valor: string) => {
                
                if (!valor || valor.length < 3) {
                    this.mostrarListaGrupo = false;
                    return of([]);
                }
                
                this.mostrarListaGrupo = true;
                return this.grupoOracaoService.loadGrupos(true,valor.toUpperCase());
            })
        )
        .subscribe((resp: any[]) => {
            this.grupoOracaoFiltrados = resp;
            console.log(this.grupoOracaoFiltrados)
        });
    }
    
    selecionarServo(servo: any): void {
        this.form.patchValue(
            {
                nomeServo: servo.name + ' - '+  servo.grupoOracao?.name,
                servoId: servo.id,
                grupoOracaoAntigoId: servo.grupoOracao?.id
            },
            { emitEvent: false } // 👈 ISSO É O SEGREDO
        );
        
        this.mostrarLista = false;
        
        console.log('Servo selecionado:', servo);
    }
    
    selecionarGrupoOracao(grupo: any): void {
        this.form.patchValue(
            {
                grupoOracao: grupo.name + ' - '+  grupo.paroquiaCapela?.name,
                grupoOracaoId: grupo.id
            },
            { emitEvent: false } // 👈 ISSO É O SEGREDO
        );
        
        this.mostrarListaGrupo = false;
        
        console.log('Servo selecionado:', grupo);
    }
    
    fecharLista(): void {
        setTimeout(() => this.mostrarLista = false, 150);
    }
    
    onSubmit(){
        this.service.save(this.form.value).subscribe((resp) => {
            this.toastr.success('Transferência de Servo(a) realizada com sucesso.');
            this.activeModal.close(resp);
        },
        (error: any) =>{
            console.log(error);
            this.toastr.warning(error.error?.message)
        });
    }
}
