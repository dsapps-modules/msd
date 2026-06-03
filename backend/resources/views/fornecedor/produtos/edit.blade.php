@extends('fornecedor.produtos.layout', ['title' => 'Editar produto'])

@section('content')
    <div class="panel">
        <h2 style="margin-top: 0;">Editar produto</h2>
        <form method="POST" action="{{ route('fornecedor.produtos.update', $product) }}">
            @csrf
            @method('PUT')
            @include('fornecedor.produtos._form', ['isEdit' => true])
            <div class="actions" style="margin-top: 18px;">
                <button class="btn primary" type="submit">Atualizar</button>
                <a class="btn" href="{{ route('fornecedor.produtos.show', $product) }}">Voltar</a>
            </div>
        </form>
    </div>
@endsection
