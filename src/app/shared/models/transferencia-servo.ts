import { GrupoOracao } from "./grupo-oracao";

export interface TransferenciaServo {
    id: number;
    name: string;
    grupoOracaoAntigoId: string;
    grupoOracaoId: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    checked: boolean;
    grupoOracao: GrupoOracao
    grupoOracaoAntigo: GrupoOracao;

}