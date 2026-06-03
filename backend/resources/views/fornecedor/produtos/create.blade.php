@extends('fornecedor.produtos.layout', ['title' => 'Cadastrar produto'])

@section('content')
    <div class="panel">
        <h2 style="margin-top: 0;">Novo produto</h2>
        <form method="POST" action="{{ route('fornecedor.produtos.store') }}">
            @csrf
            @include('fornecedor.produtos._form', ['isEdit' => false])
            <div class="actions" style="margin-top: 18px;">
                <button class="btn primary" type="submit">Salvar</button>
                <a class="btn" href="{{ route('fornecedor.produtos.index') }}">Cancelar</a>
            </div>
        </form>
    </div>
@endsection
