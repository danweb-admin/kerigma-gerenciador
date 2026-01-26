import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransferenciaServo } from '../../../../../shared/models/transferencia-servo';
import { TransferenciaServosService } from '../../../../../shared/services/transferencia-servo.service';
import { CustomPaginator } from '../../../../../shared/shared';
import { TranferenciaServosDialogComponent } from '../dialog/transferencia-servos-dialog.component';

@Component({
    selector: 'app-transferencia-servos-table',
    templateUrl: './transferencia-servos-table.component.html',
    styleUrls: ['./transferencia-servos-table.component.scss']
})
export class TranferenciaServosTableComponent {
    
    closeResult = '';
    public displayedColumns: string[] = ['nome', 'grupo_antigo', 'grupo_novo', 'efetuado','solicitado'];
    public dataSource: MatTableDataSource<TransferenciaServo> = new MatTableDataSource<TransferenciaServo>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild('inputSearch') inputSearch: ElementRef;
    
    
    constructor(private modalService: NgbModal, 
        private service: TransferenciaServosService) {
        }
        
        applyFilter(event: Event): void {
            const inputValue = this.inputSearch.nativeElement.value;
            const length = inputValue.length;
            
            if (length > 2) {
                const filterValue = (event.target as HTMLInputElement).value;
                this.loadTransferencias(filterValue);
            }
        }
        
        closeFilterInput(): void {
            this.inputSearch.nativeElement.value = '';
            this.loadTransferencias('');
        }
        
        public ngOnInit(): void {
            this.loadTransferencias('');
        }
        
        loadTransferencias(search){
            this.service.loadTransferencias(search).subscribe((resp: TransferenciaServo[]) => {
                this.dataSource = new MatTableDataSource<TransferenciaServo>();
                this.dataSource = new MatTableDataSource<TransferenciaServo>(resp);            
                this.dataSource.paginator = this.paginator; 
                console.log(resp)      
            });
            
            if (this.paginator) {
                this.dataSource.paginator = this.paginator;
                this.dataSource.paginator._intl = CustomPaginator();
            }
        }
        
        openDialog(item: any){
            const modalRef = this.modalService.open(TranferenciaServosDialogComponent, {'size': 'lg'})
            modalRef.componentInstance.paroquia = item;
            modalRef.result.then(res=>{
                this.loadTransferencias('');
            },dismiss=>{
                console.log("Cross Button",dismiss)
            })
        }
        
    }
    