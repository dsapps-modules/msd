<?php

use App\Http\Controllers\Api\V1\Fornecedor\FornecedorProductManageController;
use App\Http\Controllers\Fornecedor\FornecedorDashboardController;
use App\Http\Controllers\Fornecedor\FornecedorCadastroController;
use App\Http\Controllers\Fornecedor\FornecedorProductController;
use App\Http\Controllers\Fornecedor\FornecedorAuthController;
use App\Http\Controllers\Divulgador\DivulgadorCadastroController;
use App\Http\Controllers\Divulgador\DivulgadorAuthController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/teste', function () {
    return view('teste');
})->name('teste');

Route::get('/teste2', function () {
    return view('teste2');
})->name('teste2');

Route::get('/carrinho', [CartController::class, 'index'])->name('carrinho.index');
Route::post('/carrinho/adicionar', [CartController::class, 'add'])->name('carrinho.add');
Route::patch('/carrinho/{slug}', [CartController::class, 'update'])
    ->where('slug', '[A-Za-z0-9\-]+')
    ->name('carrinho.update');
Route::delete('/carrinho/{slug}', [CartController::class, 'remove'])
    ->where('slug', '[A-Za-z0-9\-]+')
    ->name('carrinho.remove');
Route::post('/carrinho/limpar', [CartController::class, 'clear'])->name('carrinho.clear');

Route::get('/produto/{slug}', function (string $slug) {
    $catalog = [
        'cafeteira-compacta-duo' => [
            'title' => 'Cafeteira Compacta Duo',
            'subtitle' => 'Bebidas quentes para começar o dia com praticidade.',
            'ref' => 'Ref. 1204981',
            'brand' => 'Casa & Conforto',
            'category' => 'Shopping',
            'price' => 'R$ 189,90',
            'old_price' => 'R$ 219,90',
            'points' => '9.495 pts',
            'rating' => '4,9',
            'reviews' => '168 avaliações',
            'stock' => 'Pronta entrega',
            'seller' => 'Coopera',
            'delivery' => 'Entrega estimada em 2 a 5 dias úteis',
            'delivery_note' => 'Consulte o prazo informando o CEP na área de entrega.',
            'summary' => 'Cafeteira compacta com design limpo, preparo rápido e acabamento pensado para uso diário.',
            'about' => 'Perfeita para rotina doméstica ou escritório, a cafeteira foi pensada para quem quer praticidade sem abrir mão de uma apresentação elegante. O foco é entregar preparo rápido, fácil manutenção e visual discreto.',
            'benefits' => [
                'Preparo rápido para o dia a dia',
                'Design compacto para cozinhas menores',
                'Uso simples e manutenção descomplicada',
            ],
            'details' => [
                'Voltagem compatível com padrão nacional',
                'Reservatório fácil de limpar',
                'Acabamento moderno em preto e aço',
            ],
            'images' => [
                'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1514268460827-8d63b7f2e9fa?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'kit-bem-estar-essencial' => [
            'title' => 'Kit Bem-Estar Essencial',
            'subtitle' => 'Itens para autocuidado e rotina saudável.',
            'ref' => 'Ref. 2201184',
            'brand' => 'Vida Leve',
            'category' => 'Saúde',
            'price' => 'R$ 129,00',
            'old_price' => 'R$ 149,00',
            'points' => '6.450 pts',
            'rating' => '4,8',
            'reviews' => '94 avaliações',
            'stock' => 'Mais pedido',
            'seller' => 'Coopera',
            'delivery' => 'Entrega estimada em 2 a 4 dias úteis',
            'delivery_note' => 'Selecione a região para calcular prazo e disponibilidade.',
            'summary' => 'Conjunto enxuto para autocuidado, com itens selecionados para uma rotina mais confortável.',
            'about' => 'O kit reúne produtos de uso diário com foco em bem-estar, simplicidade e apresentação limpa. É uma opção prática para presentes ou para quem quer manter uma rotina leve.',
            'benefits' => [
                'Seleção prática para uso diário',
                'Itens pensados para autocuidado',
                'Boa opção para presente',
            ],
            'details' => [
                'Conteúdo organizado em embalagem compacta',
                'Produtos de uso versátil',
                'Visual clean e fácil de guardar',
            ],
            'images' => [
                'https://images.unsplash.com/photo-1556228724-4ec648d3a7c1?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'mochila-travel-pro' => [
            'title' => 'Mochila Travel Pro',
            'subtitle' => 'Organização e resistência para deslocamentos.',
            'ref' => 'Ref. 3319047',
            'brand' => 'Travel Pro',
            'category' => 'Viagens',
            'price' => 'R$ 239,00',
            'old_price' => 'R$ 279,00',
            'points' => '11.950 pts',
            'rating' => '4,9',
            'reviews' => '121 avaliações',
            'stock' => 'Oferta limitada',
            'seller' => 'Coopera',
            'delivery' => 'Entrega estimada em 3 a 6 dias úteis',
            'delivery_note' => 'Ideal para viagem, trabalho e rotina urbana.',
            'summary' => 'Mochila com compartimentos organizados, acabamento resistente e leitura visual limpa.',
            'about' => 'Desenvolvida para deslocamentos e uso diário, a Travel Pro combina estrutura resistente com compartimentos internos que facilitam organização sem exagero de volume.',
            'benefits' => [
                'Compartimentos internos bem distribuídos',
                'Material resistente para uso frequente',
                'Ideal para trabalho e viagem',
            ],
            'details' => [
                'Alças ergonômicas',
                'Fechamentos reforçados',
                'Acabamento discreto e premium',
            ],
            'images' => [
                'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'ferramenta-multiuso-agro' => [
            'title' => 'Ferramenta Multiuso Agro',
            'subtitle' => 'Solução prática para atividades do campo.',
            'ref' => 'Ref. 4108821',
            'brand' => 'Campo Forte',
            'category' => 'Agronegócio',
            'price' => 'R$ 99,90',
            'old_price' => 'R$ 119,90',
            'points' => '4.995 pts',
            'rating' => '4,7',
            'reviews' => '88 avaliações',
            'stock' => 'Alta saída',
            'seller' => 'Coopera',
            'delivery' => 'Entrega estimada em 2 a 5 dias úteis',
            'delivery_note' => 'Indicada para manutenção e apoio operacional.',
            'summary' => 'Ferramenta funcional para rotina no campo, com foco em praticidade e durabilidade.',
            'about' => 'Com pegada prática, a ferramenta multiuso foi pensada para apoio em pequenas manutenções e atividades do dia a dia do agro, mantendo um visual simples e direto.',
            'benefits' => [
                'Versátil para diferentes tarefas',
                'Boa resistência para uso frequente',
                'Acabamento simples e funcional',
            ],
            'details' => [
                'Estrutura compacta',
                'Fácil armazenamento',
                'Uso em campo e manutenção',
            ],
            'images' => [
                'https://images.unsplash.com/photo-1586240270687-ff5e0d0f4b6f?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'smart-speaker-home' => [
            'title' => 'Smart Speaker Home',
            'subtitle' => 'Automação, música e assistente de voz.',
            'ref' => 'Ref. 5021840',
            'brand' => 'Home Tech',
            'category' => 'Shopping',
            'price' => 'R$ 349,90',
            'old_price' => 'R$ 399,90',
            'points' => '17.495 pts',
            'rating' => '5,0',
            'reviews' => '241 avaliações',
            'stock' => 'Novo na loja',
            'seller' => 'Coopera',
            'delivery' => 'Entrega estimada em 2 a 4 dias úteis',
            'delivery_note' => 'Integração com assistentes e comandos de voz.',
            'summary' => 'Dispositivo compacto para automação e uso no ambiente doméstico.',
            'about' => 'O Smart Speaker Home traz interação por voz, integração com rotina doméstica e visual minimalista para ambientes modernos.',
            'benefits' => [
                'Comandos por voz',
                'Integração com casa inteligente',
                'Som limpo para música e alertas',
            ],
            'details' => [
                'Conexão sem fio',
                'Design compacto para qualquer ambiente',
                'Usabilidade intuitiva',
            ],
            'images' => [
                'https://images.unsplash.com/photo-1518441902117-f0a73cf27d54?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1520962917960-0b55dc5a4c0f?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'kit-hidratacao-premium' => [
            'title' => 'Kit Hidratação Premium',
            'subtitle' => 'Rotina de cuidado com foco em conforto.',
            'ref' => 'Ref. 6102213',
            'brand' => 'Skin Care Lab',
            'category' => 'Saúde',
            'price' => 'R$ 79,90',
            'old_price' => 'R$ 94,90',
            'points' => '3.995 pts',
            'rating' => '4,8',
            'reviews' => '76 avaliações',
            'stock' => 'Estoque seguro',
            'seller' => 'Coopera',
            'delivery' => 'Entrega estimada em 2 a 4 dias úteis',
            'delivery_note' => 'Ideal para rotina de autocuidado e conforto diário.',
            'summary' => 'Kit de hidratação com itens simples, visual limpo e proposta de uso diário.',
            'about' => 'Pensado para quem quer uma rotina de cuidado sem excesso de etapas, o kit reúne itens de hidratação e conforto com apresentação discreta.',
            'benefits' => [
                'Rotina prática de hidratação',
                'Boa opção de presente',
                'Itens de uso frequente',
            ],
            'details' => [
                'Embalagem compacta',
                'Uso diário',
                'Visual clean e delicado',
            ],
            'images' => [
                'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'maleta-office-plus' => [
            'title' => 'Maleta Office Plus',
            'subtitle' => 'Organização com visual limpo para trabalho.',
            'ref' => 'Ref. 7129044',
            'brand' => 'Office Pro',
            'category' => 'Shopping',
            'price' => 'R$ 159,90',
            'old_price' => 'R$ 189,90',
            'points' => '7.995 pts',
            'rating' => '4,8',
            'reviews' => '103 avaliações',
            'stock' => 'Saída constante',
            'seller' => 'Coopera',
            'delivery' => 'Entrega estimada em 2 a 5 dias úteis',
            'delivery_note' => 'Feita para transportar documentos e itens pessoais.',
            'summary' => 'Maleta discreta e funcional, com estética simples para uso profissional.',
            'about' => 'A Office Plus foi desenhada para acompanhar trabalho e deslocamentos com elegância discreta, priorizando organização e praticidade.',
            'benefits' => [
                'Formato limpo para trabalho',
                'Organização facilitada',
                'Boa para documentos e acessórios',
            ],
            'details' => [
                'Fechamento reforçado',
                'Acabamento sóbrio',
                'Uso profissional e urbano',
            ],
            'images' => [
                'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1557413302-b5e5f4f2d36f?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'experiencia-fim-de-semana' => [
            'title' => 'Experiência Fim de Semana',
            'subtitle' => 'Pacote para descanso, lazer e compra.',
            'ref' => 'Ref. 9041882',
            'brand' => 'Coopera Travel',
            'category' => 'Viagens',
            'price' => 'R$ 499,90',
            'old_price' => 'R$ 559,90',
            'points' => '24.995 pts',
            'rating' => '5,0',
            'reviews' => '52 avaliações',
            'stock' => 'Seleção premium',
            'seller' => 'Coopera',
            'delivery' => 'Entrega e confirmação em até 24h',
            'delivery_note' => 'Experiência com foco em descanso, lazer e conveniência.',
            'summary' => 'Pacote com proposta premium para quem busca uma pausa organizada e confortável.',
            'about' => 'Pensado como experiência, este produto reúne comodidade, visual aspiracional e leitura clara de benefícios para momentos de descanso.',
            'benefits' => [
                'Experiência de lazer organizada',
                'Conteúdo premium e confortável',
                'Ideal para presente ou uso próprio',
            ],
            'details' => [
                'Condição especial da vitrine',
                'Reserva facilitada',
                'Orientação simples de compra',
            ],
            'images' => [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
    ];

    $product = $catalog[$slug] ?? [
        'title' => 'Produto não encontrado',
        'subtitle' => 'A vitrine não localizou este item.',
        'ref' => 'Ref. 0000000',
        'brand' => 'Coopera',
        'category' => 'Vitrine',
        'price' => 'R$ 0,00',
        'old_price' => 'R$ 0,00',
        'points' => '0 pts',
        'rating' => '0,0',
        'reviews' => '0 avaliações',
        'stock' => 'Sem disponibilidade',
        'seller' => 'Coopera',
        'delivery' => 'Entrega não disponível',
        'delivery_note' => 'O item solicitado não está cadastrado na vitrine estática.',
        'summary' => 'Produto indisponível para esta demo.',
        'about' => 'Use os cards da vitrine para abrir uma página de detalhe válida.',
        'benefits' => ['Voltar para a vitrine', 'Selecionar um produto disponível'],
        'details' => ['Conteúdo demonstrativo'],
        'images' => [
            'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
        ],
    ];

    return view('produto-detalhe', compact('product', 'slug'));
})->name('produto.detalhe');

Route::get('/previewCatalog/{path?}', function (string $path = '') {
    $previewRoot = dirname(base_path()) . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR . 'build' . DIRECTORY_SEPARATOR . 'web';
    $indexPath = $previewRoot . DIRECTORY_SEPARATOR . 'index.html';
    $rootReal = realpath($previewRoot);
    $requestedPath = ltrim($path, '/');

    if ($requestedPath !== '') {
        $candidate = realpath($previewRoot . DIRECTORY_SEPARATOR . $requestedPath);

        if (
            $candidate !== false &&
            $rootReal !== false &&
            str_starts_with($candidate, $rootReal) &&
            is_file($candidate)
        ) {
            return response()->file($candidate, [
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
            ]);
        }
    }

    $html = file_get_contents($indexPath);
    if ($html === false) {
        abort(500, 'Preview catalog unavailable.');
    }

    $html = str_replace(
        '<base href="/">',
        '<base href="/previewCatalog/">',
        $html
    );

    return response($html, 200, [
        'Content-Type' => 'text/html; charset=utf-8',
        'Cache-Control' => 'no-cache, no-store, must-revalidate',
    ]);
})->where('path', '.*');

Route::get('/login', function () {
    return redirect()->route('fornecedor.login.form');
})->name('login');

Route::prefix('fornecedor')->group(function () {
    Route::get('cadastro', [FornecedorCadastroController::class, 'create'])->name('fornecedor.cadastro.create');
    Route::post('cadastro', [FornecedorCadastroController::class, 'store'])->name('fornecedor.cadastro.store');
    Route::get('cadastro/analisando', [FornecedorCadastroController::class, 'analysing'])->name('fornecedor.cadastro.analisando');
    Route::get('login', [FornecedorAuthController::class, 'create'])->name('fornecedor.login.form');
    Route::post('login', [FornecedorAuthController::class, 'store'])->name('fornecedor.login.submit');
    Route::post('logout', [FornecedorAuthController::class, 'destroy'])->name('fornecedor.logout');
});

Route::middleware(['auth:web', 'ensure.fornecedor.access'])->prefix('fornecedor')->group(function () {
    Route::get('dashboard', [FornecedorDashboardController::class, 'dashboard'])->name('fornecedor.dashboard');

    Route::prefix('produtos')->group(function () {
        Route::get('/', [FornecedorProductController::class, 'index'])->name('fornecedor.produtos.index');
        Route::get('create', [FornecedorProductController::class, 'create'])->name('fornecedor.produtos.create');
        Route::post('/', [FornecedorProductController::class, 'store'])->name('fornecedor.produtos.store');
        Route::get('{product}', [FornecedorProductController::class, 'show'])->whereNumber('product')->name('fornecedor.produtos.show');
        Route::get('{product}/edit', [FornecedorProductController::class, 'edit'])->whereNumber('product')->name('fornecedor.produtos.edit');
        Route::match(['put', 'patch'], '{product}', [FornecedorProductController::class, 'update'])->whereNumber('product')->name('fornecedor.produtos.update');
        Route::delete('{product}', [FornecedorProductController::class, 'destroy'])->whereNumber('product')->name('fornecedor.produtos.destroy');
        Route::get('importar', [FornecedorProductManageController::class, 'index'])->name('fornecedor.produtos.importar');
        Route::post('importar', [FornecedorProductManageController::class, 'validateImport'])->name('fornecedor.produtos.validar');
        Route::post('importar/confirmar', [FornecedorProductManageController::class, 'confirmImport'])->name('fornecedor.produtos.confirmar');
        Route::get('modelo', [FornecedorProductManageController::class, 'template'])->name('fornecedor.produtos.modelo');
    });
});

Route::prefix('divulgador')->group(function () {
    Route::get('/', function () {
        return redirect()->route('divulgador.login.form');
    });
    Route::get('cadastro', [DivulgadorCadastroController::class, 'create'])->name('divulgador.cadastro.create');
    Route::post('cadastro', [DivulgadorCadastroController::class, 'store'])->name('divulgador.cadastro.store');
    Route::get('cadastro/analisando', [DivulgadorAuthController::class, 'analysing'])->name('divulgador.cadastro.analisando');
    Route::get('login', [DivulgadorAuthController::class, 'create'])->name('divulgador.login.form');
    Route::post('login', [DivulgadorAuthController::class, 'store'])->name('divulgador.login.submit');
    Route::get('analisando', [DivulgadorAuthController::class, 'analysing'])->name('divulgador.analisando');
    Route::get('dashboard', [DivulgadorAuthController::class, 'dashboard'])->name('divulgador.dashboard');
    Route::post('campanhas', [DivulgadorAuthController::class, 'storeCampaign'])->name('divulgador.campanhas.store');
    Route::match(['put', 'patch'], 'campanhas/{campaign}', [DivulgadorAuthController::class, 'updateCampaign'])->whereNumber('campaign')->name('divulgador.campanhas.update');
    Route::delete('campanhas/{campaign}', [DivulgadorAuthController::class, 'destroyCampaign'])->whereNumber('campaign')->name('divulgador.campanhas.destroy');
    Route::post('logout', [DivulgadorAuthController::class, 'destroy'])->name('divulgador.logout');
});
