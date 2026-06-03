@extends('fornecedor.produtos.layout', ['title' => 'Lista de produtos'])

@section('content')
    <div class="panel">
        <div class="actions" style="justify-content: space-between; margin-bottom: 16px;">
            <div>
                <h2 style="margin: 0 0 4px;">Produtos vinculados ao fornecedor logado</h2>
                <div class="muted">Listagem filtrada por `account_id` do usuário autenticado.</div>
            </div>
            <a class="btn primary" href="{{ route('fornecedor.produtos.create') }}">Cadastrar produto</a>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Estoque</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($products as $product)
                    <tr>
                        <td>{{ $product->codigo }}</td>
                        <td>{{ $product->name }}</td>
                        <td>R$ {{ number_format((float) $product->valor_venda, 2, ',', '.') }}</td>
                        <td>{{ $product->estoque_reservado }}</td>
                        <td>{{ $product->status }}</td>
                        <td class="actions">
                            <a class="chip" href="{{ route('fornecedor.produtos.show', $product) }}">Ver</a>
                            <a class="chip" href="{{ route('fornecedor.produtos.edit', $product) }}">Editar</a>
                            <form method="POST" action="{{ route('fornecedor.produtos.destroy', $product) }}" onsubmit="return confirm('Excluir este produto?');" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class="chip" type="submit" style="cursor:pointer;">Excluir</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" class="muted">Nenhum produto cadastrado.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
