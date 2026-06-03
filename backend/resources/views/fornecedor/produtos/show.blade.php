@extends('fornecedor.produtos.layout', ['title' => 'Detalhes do produto'])

@section('content')
    <div class="panel">
        <div class="actions" style="justify-content: space-between; margin-bottom: 16px;">
            <div>
                <h2 style="margin: 0 0 4px;">{{ $product->name }}</h2>
                <div class="muted">Código {{ $product->codigo }}</div>
            </div>
            <div class="actions">
                <a class="chip" href="{{ route('fornecedor.produtos.edit', $product) }}">Editar</a>
                <form method="POST" action="{{ route('fornecedor.produtos.destroy', $product) }}" onsubmit="return confirm('Excluir este produto?');" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button class="chip" type="submit" style="cursor:pointer;">Excluir</button>
                </form>
            </div>
        </div>

        <div class="grid cols-4">
            <div class="panel" style="background: rgba(255,255,255,.03);">
                <div class="muted">Valor de venda</div>
                <strong>R$ {{ number_format((float) $product->valor_venda, 2, ',', '.') }}</strong>
            </div>
            <div class="panel" style="background: rgba(255,255,255,.03);">
                <div class="muted">Estoque reservado</div>
                <strong>{{ $product->estoque_reservado }}</strong>
            </div>
            <div class="panel" style="background: rgba(255,255,255,.03);">
                <div class="muted">Peso</div>
                <strong>{{ $product->peso }}</strong>
            </div>
            <div class="panel" style="background: rgba(255,255,255,.03);">
                <div class="muted">Status</div>
                <strong>{{ $product->status }}</strong>
            </div>
        </div>

        <div style="margin-top: 20px;" class="grid cols-2">
            <div>
                <h3>Descrição</h3>
                <p class="muted">{{ $product->description ?: 'Sem descrição.' }}</p>
            </div>
            <div>
                <h3>Dimensões</h3>
                <p class="muted">Altura: {{ $product->altura }} | Largura: {{ $product->largura }} | Comprimento: {{ $product->comprimento }}</p>
                <p class="muted">Embalagem: {{ $product->embalagem }}</p>
            </div>
        </div>
    </div>
@endsection
