<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class FornecedorProductTemplateExport implements FromArray, WithHeadings
{
    public function headings(): array
    {
        return [
            'CODIGO',
            'DESCRIÇÃO DO PRODUTOS',
            'ALTURA',
            'LARGURA',
            'COMPRIMENTO',
            'PESO',
            'EMBALAGEM',
            'VALOR DE VENDA',
            'IMAGENS',
            'ESTOQUE RESERVADO',
        ];
    }

    public function array(): array
    {
        return [[
            'PROD-001',
            'Kit Clareador Dental Premium',
            10,
            20,
            30,
            0.850,
            'Caixa',
            249.90,
            'PROD-001-1.jpg;PROD-001-2.jpg',
            15,
        ]];
    }
}
