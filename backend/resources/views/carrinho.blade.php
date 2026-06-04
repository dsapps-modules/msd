<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrinho | Coopera</title>
    <style>
        :root {
            --bg: #eef3fb;
            --panel: #ffffff;
            --panel-soft: #f8fbff;
            --text: #102033;
            --muted: #64748b;
            --line: #dbe4f0;
            --blue: #2563eb;
            --cyan: #38bdf8;
            --green: #16a34a;
            --shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
            --shadow-soft: 0 8px 20px rgba(15, 23, 42, 0.045);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
            margin: 0;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: var(--text);
            background:
                radial-gradient(circle at top left, rgba(37, 99, 235, 0.06), transparent 22%),
                radial-gradient(circle at top right, rgba(56, 189, 248, 0.08), transparent 18%),
                linear-gradient(180deg, #fbfdff 0%, var(--bg) 100%);
        }

        a { color: inherit; text-decoration: none; }
        button, input { font: inherit; }

        .shell {
            min-height: 100vh;
            padding: 18px;
        }

        .page {
            max-width: 1360px;
            margin: 0 auto;
            display: grid;
            gap: 16px;
        }

        .topbar,
        .section,
        .card {
            background: rgba(255, 255, 255, 0.94);
            border: 1px solid rgba(219, 228, 240, 0.95);
            border-radius: 24px;
            box-shadow: var(--shadow);
            backdrop-filter: blur(10px);
        }

        .topbar {
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-mark {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            font-weight: 800;
            box-shadow: 0 10px 22px rgba(37, 99, 235, 0.16);
        }

        .brand-text strong {
            display: block;
            font-size: 16px;
            line-height: 1.15;
            font-weight: 700;
        }

        .brand-text span {
            display: block;
            margin-top: 3px;
            color: var(--muted);
            font-size: 12px;
        }

        .top-links {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .pill,
        .chip {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 36px;
            padding: 0 12px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #fff;
            color: #0f3d8c;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: .04em;
            text-transform: uppercase;
        }

        .page-head {
            padding: 18px;
            display: grid;
            gap: 10px;
        }

        .page-head h1 {
            margin: 0;
            font-size: clamp(28px, 4vw, 40px);
            line-height: 1;
            letter-spacing: -0.04em;
        }

        .page-head p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
        }

        .flash {
            padding: 14px 16px;
            border-radius: 18px;
            border: 1px solid rgba(22, 163, 74, 0.15);
            background: rgba(22, 163, 74, 0.08);
            color: #14532d;
            font-weight: 600;
        }

        .layout {
            display: grid;
            grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.55fr);
            gap: 16px;
            align-items: start;
        }

        .items,
        .summary {
            background: rgba(255, 255, 255, 0.94);
            border: 1px solid rgba(219, 228, 240, 0.95);
            border-radius: 24px;
            box-shadow: var(--shadow-soft);
            overflow: hidden;
        }

        .items-head,
        .summary-head {
            padding: 18px;
            border-bottom: 1px solid var(--line);
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
        }

        .items-head h2,
        .summary-head h2 {
            margin: 0;
            font-size: 18px;
            letter-spacing: -0.03em;
        }

        .items-head p,
        .summary-head p {
            margin: 0;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.55;
        }

        .items-body,
        .summary-body {
            padding: 18px;
        }

        .cart-list {
            display: grid;
            gap: 14px;
        }

        .cart-item {
            display: grid;
            grid-template-columns: 140px minmax(0, 1fr) auto;
            gap: 14px;
            padding: 14px;
            border-radius: 20px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            box-shadow: 0 8px 20px rgba(15, 23, 42, 0.03);
        }

        .item-image {
            min-height: 140px;
            border-radius: 18px;
            overflow: hidden;
            background:
                radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent 30%),
                linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(56, 189, 248, 0.12));
            border: 1px solid rgba(219, 228, 240, 0.8);
        }

        .item-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .item-content {
            display: grid;
            gap: 10px;
        }

        .item-content h3 {
            margin: 0;
            font-size: 18px;
            line-height: 1.15;
            letter-spacing: -0.03em;
        }

        .item-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .item-meta .chip {
            text-transform: none;
            letter-spacing: 0;
            font-weight: 700;
            min-height: 32px;
            color: #334155;
        }

        .item-desc {
            margin: 0;
            color: var(--muted);
            line-height: 1.6;
            font-size: 14px;
        }

        .item-actions {
            display: grid;
            justify-items: end;
            align-content: space-between;
            gap: 12px;
        }

        .item-price {
            text-align: right;
            display: grid;
            gap: 4px;
        }

        .item-price strong {
            font-size: 22px;
            letter-spacing: -0.03em;
        }

        .item-price span {
            color: var(--muted);
            font-size: 12px;
        }

        .quantity-form {
            display: grid;
            gap: 8px;
            justify-items: end;
        }

        .quantity-form label {
            font-size: 12px;
            font-weight: 800;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--muted);
        }

        .stepper {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            border: 1px solid var(--line);
            border-radius: 16px;
            background: #fff;
        }

        .stepper button {
            width: 34px;
            height: 34px;
            border: 0;
            border-radius: 12px;
            background: #f8fbff;
            color: #0f3d8c;
            cursor: pointer;
            font-weight: 800;
        }

        .stepper input {
            width: 56px;
            text-align: center;
            border: 0;
            outline: none;
            font-weight: 800;
            background: transparent;
            color: var(--text);
        }

        .action-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: flex-end;
        }

        .btn {
            appearance: none;
            border: 0;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 14px;
            padding: 0 16px;
            min-height: 44px;
            font-weight: 700;
            transition: transform .15s ease, opacity .15s ease, background .15s ease;
        }

        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            box-shadow: 0 10px 20px rgba(37, 99, 235, 0.14);
        }
        .btn-secondary {
            background: rgba(37, 99, 235, 0.07);
            color: #0f3d8c;
            border: 1px solid rgba(37, 99, 235, 0.10);
        }
        .btn-danger {
            background: rgba(239, 68, 68, 0.08);
            color: #b91c1c;
            border: 1px solid rgba(239, 68, 68, 0.12);
        }

        .summary {
            position: sticky;
            top: 18px;
        }

        .summary-body {
            display: grid;
            gap: 16px;
        }

        .summary-list {
            display: grid;
            gap: 12px;
        }

        .summary-line {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            font-size: 14px;
            line-height: 1.5;
            color: var(--muted);
        }

        .summary-line strong {
            color: var(--text);
        }

        .summary-total {
            padding-top: 12px;
            border-top: 1px solid var(--line);
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: baseline;
        }

        .summary-total strong {
            font-size: 22px;
            letter-spacing: -0.03em;
        }

        .summary-note {
            color: var(--muted);
            font-size: 13px;
            line-height: 1.65;
            margin: 0;
        }

        .summary-actions {
            display: grid;
            gap: 10px;
        }

        .empty {
            padding: 28px;
            border-radius: 22px;
            border: 1px dashed rgba(37, 99, 235, 0.18);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: grid;
            gap: 12px;
            justify-items: start;
        }

        .empty h3 {
            margin: 0;
            font-size: 22px;
            letter-spacing: -0.03em;
        }

        .empty p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
        }

        @media (max-width: 1100px) {
            .layout {
                grid-template-columns: 1fr;
            }

            .summary {
                position: static;
            }
        }

        @media (max-width: 760px) {
            .shell { padding: 12px; }

            .cart-item {
                grid-template-columns: 1fr;
            }

            .item-actions {
                justify-items: start;
            }

            .item-price,
            .quantity-form,
            .action-row {
                justify-items: start;
                justify-content: flex-start;
                text-align: left;
            }
        }
    </style>
</head>
<body>
@php
    $cartCount = $itemsCount ?? 0;
@endphp
    <div class="shell">
        <div class="page">
            <div class="topbar">
                <a class="brand" href="{{ route('teste2') }}">
                    <div class="brand-mark">C</div>
                    <div class="brand-text">
                        <strong>Coopera Vitrine</strong>
                        <span>Carrinho com visual clean</span>
                    </div>
                </a>

                <div class="top-links">
                    <a class="pill" href="{{ route('teste2') }}">Continuar comprando</a>
                    <a class="pill" href="#itens">Itens ({{ $cartCount }})</a>
                </div>
            </div>

            <section class="section page-head">
                <span class="chip">Carrinho</span>
                <h1>Revise os produtos escolhidos antes de seguir.</h1>
                <p>Uma experiência enxuta, com leitura clara, mesma paleta da vitrine e ações diretas para ajustar quantidade ou remover itens.</p>
            </section>

            @if(session('success'))
                <div class="flash">{{ session('success') }}</div>
            @endif

            @if(empty($cart))
                <section class="section">
                    <div class="items-body">
                        <div class="empty">
                            <span class="chip">Carrinho vazio</span>
                            <h3>Seu carrinho ainda não tem itens.</h3>
                            <p>Volte para a vitrine, abra um produto e adicione os itens que quiser comparar ou comprar depois.</p>
                            <a class="btn btn-primary" href="{{ route('teste2') }}">Ver produtos</a>
                        </div>
                    </div>
                </section>
            @else
                <div class="layout">
                    <section class="items" id="itens">
                        <div class="items-head">
                            <div>
                                <h2>Itens do carrinho</h2>
                                <p>{{ $cartCount }} produto(s) no carrinho.</p>
                            </div>
                            <form method="POST" action="{{ route('carrinho.clear') }}">
                                @csrf
                                <button class="btn btn-secondary" type="submit">Limpar carrinho</button>
                            </form>
                        </div>

                        <div class="items-body">
                            <div class="cart-list">
                                @foreach($cart as $item)
                                    @php
                                        $lineTotal = $item['price_value'] * $item['quantity'];
                                    @endphp
                                    <article class="cart-item">
                                        <div class="item-image">
                                            <img src="{{ $item['image'] }}" alt="{{ $item['title'] }}">
                                        </div>

                                        <div class="item-content">
                                            <span class="chip">{{ $item['category'] }}</span>
                                            <h3>{{ $item['title'] }}</h3>
                                            <div class="item-meta">
                                                <span class="chip">{{ $item['brand'] }}</span>
                                                @if(!empty($item['ref']))
                                                    <span class="chip">{{ $item['ref'] }}</span>
                                                @endif
                                                <span class="chip">{{ $item['stock'] }}</span>
                                            </div>
                                            <p class="item-desc">{{ $item['subtitle'] }}</p>
                                        </div>

                                        <div class="item-actions">
                                            <div class="item-price">
                                                <strong>R$ {{ number_format($lineTotal, 2, ',', '.') }}</strong>
                                                <span>R$ {{ $item['price_label'] }} cada</span>
                                            </div>

                                            <form class="quantity-form" method="POST" action="{{ route('carrinho.update', $item['slug']) }}">
                                                @csrf
                                                @method('PATCH')
                                                <label>Quantidade</label>
                                                <div class="stepper">
                                                    <button type="button" data-step="-1" aria-label="Diminuir quantidade">−</button>
                                                    <input type="number" name="quantity" value="{{ $item['quantity'] }}" min="1" max="99">
                                                    <button type="button" data-step="1" aria-label="Aumentar quantidade">+</button>
                                                </div>
                                                <div class="action-row">
                                                    <button class="btn btn-secondary" type="submit">Atualizar</button>
                                                </div>
                                            </form>

                                            <form method="POST" action="{{ route('carrinho.remove', $item['slug']) }}">
                                                @csrf
                                                @method('DELETE')
                                                <button class="btn btn-danger" type="submit">Remover</button>
                                            </form>
                                        </div>
                                    </article>
                                @endforeach
                            </div>
                        </div>
                    </section>

                    <aside class="summary">
                        <div class="summary-head">
                            <div>
                                <h2>Resumo</h2>
                                <p>Valores calculados a partir dos itens do carrinho.</p>
                            </div>
                        </div>

                        <div class="summary-body">
                            <div class="summary-list">
                                <div class="summary-line">
                                    <span>Subtotal</span>
                                    <strong>R$ {{ number_format($subtotal, 2, ',', '.') }}</strong>
                                </div>
                                <div class="summary-line">
                                    <span>Frete</span>
                                    <strong>{{ $shipping > 0 ? 'R$ ' . number_format($shipping, 2, ',', '.') : 'Grátis' }}</strong>
                                </div>
                                <div class="summary-total">
                                    <span>Total</span>
                                    <strong>R$ {{ number_format($total, 2, ',', '.') }}</strong>
                                </div>
                            </div>

                            <p class="summary-note">O carrinho aqui é estático no fluxo de compra, mas já permite adicionar, atualizar e remover produtos com persistência em sessão local.</p>

                            <div class="summary-actions">
                                <a class="btn btn-primary" href="{{ route('teste2') }}">Continuar comprando</a>
                                <a class="btn btn-secondary" href="{{ route('teste2') }}#produtos">Voltar para a vitrine</a>
                            </div>
                        </div>
                    </aside>
                </div>
            @endif
        </div>
    </div>

    <script>
        (() => {
            document.querySelectorAll('.quantity-form').forEach((form) => {
                const input = form.querySelector('input[type="number"]');
                const buttons = form.querySelectorAll('[data-step]');

                buttons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const current = Number(input?.value ?? 1);
                        const step = Number(button.getAttribute('data-step') ?? 0);
                        const next = Math.max(1, Math.min(99, current + step));

                        if (input) {
                            input.value = String(next);
                        }
                    });
                });
            });
        })();
    </script>
</body>
</html>
