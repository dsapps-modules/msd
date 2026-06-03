@php
    $isEdit = $isEdit ?? false;
@endphp

<div class="grid cols-2">
    <div class="field">
        <label for="codigo">Código</label>
        <input id="codigo" name="codigo" value="{{ old('codigo', $product->codigo ?? '') }}" required>
    </div>
    <div class="field">
        <label for="name">Nome</label>
        <input id="name" name="name" value="{{ old('name', $product->name ?? '') }}" required>
    </div>
    <div class="field" style="grid-column: 1 / -1;">
        <label for="description">Descrição</label>
        <textarea id="description" name="description">{{ old('description', $product->description ?? '') }}</textarea>
    </div>
    <div class="field">
        <label for="altura">Altura</label>
        <input id="altura" name="altura" type="number" step="0.01" value="{{ old('altura', $product->altura ?? 0) }}" required>
    </div>
    <div class="field">
        <label for="largura">Largura</label>
        <input id="largura" name="largura" type="number" step="0.01" value="{{ old('largura', $product->largura ?? 0) }}" required>
    </div>
    <div class="field">
        <label for="comprimento">Comprimento</label>
        <input id="comprimento" name="comprimento" type="number" step="0.01" value="{{ old('comprimento', $product->comprimento ?? 0) }}" required>
    </div>
    <div class="field">
        <label for="peso">Peso</label>
        <input id="peso" name="peso" type="number" step="0.001" value="{{ old('peso', $product->peso ?? 0) }}" required>
    </div>
    <div class="field">
        <label for="embalagem">Embalagem</label>
        <input id="embalagem" name="embalagem" value="{{ old('embalagem', $product->embalagem ?? '') }}" required>
    </div>
    <div class="field">
        <label for="valor_venda">Valor de venda</label>
        <input id="valor_venda" name="valor_venda" type="number" step="0.01" value="{{ old('valor_venda', $product->valor_venda ?? 0) }}" required>
    </div>
    <div class="field">
        <label for="estoque_reservado">Estoque reservado</label>
        <input id="estoque_reservado" name="estoque_reservado" type="number" step="1" value="{{ old('estoque_reservado', $product->estoque_reservado ?? 0) }}" required>
    </div>
</div>
