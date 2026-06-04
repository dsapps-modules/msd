<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $product['title'] }} | Coopera</title>
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
            --amber: #f59e0b;
            --violet: #7c3aed;
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
            max-width: 1440px;
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

        .hero {
            display: grid;
            grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
            gap: 16px;
            align-items: start;
        }

        .gallery,
        .buybox,
        .content-card,
        .footer-card {
            background: rgba(255, 255, 255, 0.94);
            border: 1px solid rgba(219, 228, 240, 0.95);
            border-radius: 24px;
            box-shadow: var(--shadow-soft);
            overflow: hidden;
        }

        .gallery {
            padding: 16px;
        }

        .breadcrumb {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            color: var(--muted);
            font-size: 13px;
            margin-bottom: 14px;
        }

        .breadcrumb a { color: #0f3d8c; }

        .headline {
            display: grid;
            gap: 10px;
            margin-bottom: 16px;
        }

        .headline h1 {
            margin: 0;
            font-size: clamp(28px, 4vw, 44px);
            line-height: 1;
            letter-spacing: -0.04em;
        }

        .headline p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
            font-size: 15px;
        }

        .meta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 4px;
        }

        .status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-height: 34px;
            padding: 0 12px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: .05em;
            text-transform: uppercase;
        }

        .status.success { background: rgba(22, 163, 74, 0.10); color: var(--green); }
        .status.warning { background: rgba(245, 158, 11, 0.12); color: var(--amber); }

        .gallery-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.28fr) minmax(260px, 0.72fr);
            gap: 14px;
            align-items: start;
        }

        .main-image {
            position: relative;
            min-height: 520px;
            border-radius: 22px;
            overflow: hidden;
            background:
                linear-gradient(135deg, rgba(37, 99, 235, 0.14), rgba(56, 189, 248, 0.10)),
                #e8f3ff;
            border: 1px solid var(--line);
        }

        .main-image::after {
            content: "";
            position: absolute;
            inset: auto -80px -90px auto;
            width: 260px;
            height: 260px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.16);
            filter: blur(8px);
        }

        .main-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .overlay-badge {
            position: absolute;
            left: 18px;
            top: 18px;
            z-index: 1;
        }

        .thumbs {
            display: grid;
            gap: 12px;
        }

        .thumb {
            position: relative;
            overflow: hidden;
            min-height: 158px;
            border-radius: 18px;
            border: 1px solid var(--line);
            background: #f8fbff;
            cursor: pointer;
            padding: 0;
        }

        .thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .thumb.active {
            outline: 2px solid rgba(37, 99, 235, 0.28);
            box-shadow: 0 10px 24px rgba(37, 99, 235, 0.10);
        }

        .gallery-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 14px;
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

        .buybox {
            padding: 18px;
            position: sticky;
            top: 18px;
        }

        .buybox h2 {
            margin: 0 0 8px;
            font-size: 24px;
            line-height: 1.05;
            letter-spacing: -0.04em;
        }

        .buybox p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
            font-size: 14px;
        }

        .price-card {
            margin-top: 16px;
            padding: 16px;
            border-radius: 20px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: grid;
            gap: 10px;
        }

        .price-row {
            display: flex;
            align-items: baseline;
            flex-wrap: wrap;
            gap: 10px;
        }

        .price-now {
            font-size: 34px;
            font-weight: 900;
            letter-spacing: -0.04em;
        }

        .price-before {
            color: var(--muted);
            text-decoration: line-through;
            font-size: 13px;
        }

        .buy-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .buy-meta .chip {
            text-transform: none;
            letter-spacing: 0;
            font-weight: 700;
            min-height: 34px;
            color: #334155;
        }

        .qty {
            display: grid;
            gap: 10px;
            margin-top: 14px;
        }

        .qty label,
        .delivery label {
            font-size: 12px;
            font-weight: 800;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--muted);
        }

        .qty-control {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            width: fit-content;
            padding: 8px;
            border-radius: 16px;
            border: 1px solid var(--line);
            background: #fff;
        }

        .qty-control button {
            width: 34px;
            height: 34px;
            border: 0;
            border-radius: 12px;
            background: #f8fbff;
            color: #0f3d8c;
            cursor: pointer;
            font-weight: 800;
        }

        .qty-control span {
            min-width: 34px;
            text-align: center;
            font-weight: 800;
        }

        .delivery {
            margin-top: 14px;
            display: grid;
            gap: 10px;
        }

        .delivery-box {
            padding: 14px;
            border-radius: 18px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: grid;
            gap: 8px;
        }

        .delivery-box strong {
            font-size: 14px;
            line-height: 1.4;
        }

        .delivery-box span {
            color: var(--muted);
            font-size: 13px;
            line-height: 1.55;
        }

        .delivery-form {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 10px;
        }

        .delivery-form input {
            width: 100%;
            min-height: 46px;
            border: 1px solid var(--line);
            border-radius: 14px;
            padding: 0 14px;
            outline: none;
            background: #fff;
        }

        .cart-form {
            display: grid;
            gap: 14px;
            margin-top: 14px;
        }

        .cart-form-actions {
            display: grid;
            gap: 10px;
        }

        .section {
            overflow: hidden;
        }

        .section-head {
            padding: 18px 18px 12px;
            border-bottom: 1px solid var(--line);
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: flex-start;
            flex-wrap: wrap;
        }

        .section-head h3 {
            margin: 0 0 8px;
            font-size: 18px;
            letter-spacing: -0.03em;
        }

        .section-head p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
        }

        .section-body {
            padding: 18px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
        }

        .info-card {
            padding: 16px;
            border-radius: 20px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
        }

        .info-card h4 {
            margin: 0 0 10px;
            font-size: 15px;
            letter-spacing: -0.02em;
        }

        .info-card p,
        .info-card li {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
            font-size: 14px;
        }

        .info-card ul {
            margin: 0;
            padding-left: 18px;
            display: grid;
            gap: 8px;
        }

        .related-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 14px;
        }

        .related-card {
            overflow: hidden;
            border-radius: 20px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
        }

        .related-card .art {
            min-height: 160px;
            background:
                radial-gradient(circle at top right, rgba(255, 255, 255, 0.24), transparent 30%),
                linear-gradient(135deg, var(--a, #2563eb), var(--b, #38bdf8));
            color: #fff;
            padding: 16px;
            display: grid;
            align-content: space-between;
        }

        .related-card h4 {
            margin: 0 0 6px;
            font-size: 18px;
            line-height: 1.1;
            letter-spacing: -0.03em;
        }

        .related-card p {
            margin: 0;
            color: rgba(226, 232, 240, 0.90);
            font-size: 13px;
            line-height: 1.5;
        }

        .related-body {
            padding: 16px;
            display: grid;
            gap: 10px;
        }

        .related-price {
            font-size: 22px;
            font-weight: 900;
            letter-spacing: -0.04em;
        }

        .footer {
            padding: 18px;
            display: grid;
            gap: 14px;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }

        .footer-card {
            padding: 16px;
        }

        .footer-card h4 {
            margin: 0 0 8px;
            font-size: 15px;
        }

        .footer-card p,
        .footer-card a {
            color: var(--muted);
            line-height: 1.65;
            font-size: 13px;
        }

        .footer-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .footer-bottom {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
            color: var(--muted);
            font-size: 12px;
        }

        @media (max-width: 1180px) {
            .hero,
            .gallery-grid,
            .info-grid,
            .related-grid,
            .footer-grid {
                grid-template-columns: 1fr 1fr;
            }

            .hero {
                grid-template-columns: 1fr;
            }

            .buybox {
                position: static;
            }
        }

        @media (max-width: 760px) {
            .shell { padding: 12px; }
            .hero,
            .gallery-grid,
            .info-grid,
            .related-grid,
            .footer-grid {
                grid-template-columns: 1fr;
            }

            .main-image {
                min-height: 360px;
            }

            .delivery-form {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
@php
    $images = $product['images'] ?? [];
    $mainImage = $images[0] ?? 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80';
    $cartCount = array_sum(array_map(static fn (array $item): int => (int) ($item['quantity'] ?? 0), session('clean_cart', [])));
    $related = [
        [
            'title' => 'Kit Bem-Estar Essencial',
            'price' => 'R$ 129,00',
            'a' => '#7c3aed',
            'b' => '#a78bfa',
        ],
        [
            'title' => 'Smart Speaker Home',
            'price' => 'R$ 349,90',
            'a' => '#0f3d8c',
            'b' => '#2563eb',
        ],
        [
            'title' => 'Mochila Travel Pro',
            'price' => 'R$ 239,00',
            'a' => '#f59e0b',
            'b' => '#fbbf24',
        ],
        [
            'title' => 'Kit Hidratação Premium',
            'price' => 'R$ 79,90',
            'a' => '#0891b2',
            'b' => '#38bdf8',
        ],
    ];
@endphp
    <div class="shell">
        <div class="page">
            <div class="topbar">
                <a class="brand" href="{{ route('teste2') }}">
                    <div class="brand-mark">C</div>
                    <div class="brand-text">
                        <strong>Coopera Vitrine</strong>
                        <span>Detalhe do produto em visual clean</span>
                    </div>
                </a>

                <div class="top-links">
                    <a class="pill" href="{{ route('teste2') }}">Voltar à vitrine</a>
                    <a class="pill" href="#sobre">Sobre o produto</a>
                    <a class="pill" href="#relacionados">Relacionados</a>
                </div>
            </div>

            <section class="hero">
                <article class="gallery">
                    <div class="breadcrumb">
                        <a href="{{ route('teste2') }}">Vitrine</a>
                        <span>/</span>
                        <span>{{ $product['category'] }}</span>
                        <span>/</span>
                        <span>{{ $product['title'] }}</span>
                    </div>

                    <div class="headline">
                        <span class="status {{ str_contains($product['stock'], 'limitada') ? 'warning' : 'success' }}">{{ $product['stock'] }}</span>
                        <h1>{{ $product['title'] }}</h1>
                        <p>{{ $product['summary'] }}</p>
                        <div class="meta-row">
                            <span class="chip">{{ $product['brand'] }}</span>
                            <span class="chip">{{ $product['ref'] }}</span>
                            <span class="chip">{{ $product['rating'] }} | {{ $product['reviews'] }}</span>
                            <span class="chip">Vendido e entregue por {{ $product['seller'] }}</span>
                        </div>
                    </div>

                    <div class="gallery-grid">
                        <div class="main-image">
                            <span class="overlay-badge pill">{{ $product['category'] }}</span>
                            <img src="{{ $mainImage }}" alt="{{ $product['title'] }}">
                        </div>

                        <div class="thumbs">
                            @foreach(array_slice($images, 1, 3) as $index => $image)
                                <button class="thumb {{ $index === 0 ? 'active' : '' }}" type="button" data-thumb="{{ $image }}">
                                    <img src="{{ $image }}" alt="Imagem {{ $index + 2 }} de {{ $product['title'] }}">
                                </button>
                            @endforeach
                        </div>
                    </div>

                    <div class="gallery-actions">
                        <button class="btn btn-primary" type="submit" form="product-cart-form">Comprar agora</button>
                        <a class="btn btn-secondary" href="#sobre">Sobre o produto</a>
                        <a class="btn btn-secondary" href="{{ route('carrinho.index') }}">Ver carrinho ({{ $cartCount }})</a>
                    </div>
                </article>

                <aside class="buybox" id="compra">
                    <span class="pill">Oferta da vitrine</span>
                    <h2>{{ $product['title'] }}</h2>
                    <p>{{ $product['subtitle'] }}</p>

                    <div class="price-card">
                        <div class="price-row">
                            <span class="price-now">{{ $product['price'] }}</span>
                            <span class="price-before">{{ $product['old_price'] }}</span>
                        </div>
                        <div class="buy-meta">
                            <span class="chip">até 12x</span>
                            <span class="chip">{{ $product['stock'] }}</span>
                        </div>
                    </div>

                    <div class="delivery">
                        <label>Entrega</label>
                        <div class="delivery-form">
                            <input type="text" placeholder="Digite seu CEP" aria-label="CEP">
                            <a class="btn btn-secondary" href="#sobre">Calcular</a>
                        </div>

                        <div class="delivery-box">
                            <strong>{{ $product['delivery'] }}</strong>
                            <span>{{ $product['delivery_note'] }}</span>
                        </div>
                    </div>

                    <form class="cart-form" id="product-cart-form" method="POST" action="{{ route('carrinho.add') }}">
                        @csrf
                        <input type="hidden" name="slug" value="{{ $slug }}">
                        <input type="hidden" name="title" value="{{ $product['title'] }}">
                        <input type="hidden" name="subtitle" value="{{ $product['subtitle'] }}">
                        <input type="hidden" name="category" value="{{ $product['category'] }}">
                        <input type="hidden" name="brand" value="{{ $product['brand'] }}">
                        <input type="hidden" name="ref" value="{{ $product['ref'] }}">
                        <input type="hidden" name="price" value="{{ $product['price'] }}">
                        <input type="hidden" name="old_price" value="{{ $product['old_price'] }}">
                        <input type="hidden" name="image" value="{{ $mainImage }}">
                        <input type="hidden" name="stock" value="{{ $product['stock'] }}">
                        <input type="hidden" name="quantity" value="1" id="product-quantity">
                        <input type="hidden" name="redirect_to" value="{{ route('carrinho.index') }}">

                        <div class="qty">
                            <label>Quantidade</label>
                            <div class="qty-control" aria-label="Selecionar quantidade">
                                <button type="button" aria-label="Diminuir quantidade" data-qty="-">−</button>
                                <span id="product-quantity-label">1</span>
                                <button type="button" aria-label="Aumentar quantidade" data-qty="+">+</button>
                            </div>
                        </div>

                        <div class="cart-form-actions">
                            <button class="btn btn-primary" type="submit">Adicionar ao carrinho</button>
                            <a class="btn btn-secondary" href="#relacionados">Ver similares</a>
                        </div>
                    </form>
                </aside>
            </section>

            <section class="section" id="sobre">
                <div class="section-head">
                    <div>
                        <h3>Sobre o produto</h3>
                        <p>Leitura enxuta, organizada e próxima da estrutura da página de referência, mas com o visual clean da demo.</p>
                    </div>
                    <span class="chip">{{ $product['category'] }}</span>
                </div>
                <div class="section-body">
                    <div class="info-grid">
                        <article class="info-card">
                            <h4>Descrição</h4>
                            <p>{{ $product['about'] }}</p>
                        </article>
                        <article class="info-card">
                            <h4>Destaques</h4>
                            <ul>
                                @foreach($product['benefits'] as $benefit)
                                    <li>{{ $benefit }}</li>
                                @endforeach
                            </ul>
                        </article>
                        <article class="info-card">
                            <h4>Especificações</h4>
                            <ul>
                                @foreach($product['details'] as $detail)
                                    <li>{{ $detail }}</li>
                                @endforeach
                            </ul>
                        </article>
                        <article class="info-card">
                            <h4>Marca e origem</h4>
                            <p><strong>{{ $product['brand'] }}</strong> | {{ $product['seller'] }}</p>
                            <p style="margin-top: 10px;">{{ $product['delivery_note'] }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="section-head">
                    <div>
                        <h3>Entrega e compra</h3>
                        <p>Resumo rápido da experiência de compra, alinhado à vitrine clean.</p>
                    </div>
                </div>
                <div class="section-body">
                    <div class="info-grid">
                        <article class="info-card">
                            <h4>Pagamento</h4>
                            <p>Cartão, Pix e pontos como alternativas visíveis na vitrine.</p>
                        </article>
                        <article class="info-card">
                            <h4>Prazo</h4>
                            <p>{{ $product['delivery'] }}</p>
                        </article>
                        <article class="info-card">
                            <h4>Condições</h4>
                            <p>Oferta demonstrativa, com leitura clara de preço e estoque.</p>
                        </article>
                        <article class="info-card">
                            <h4>Avaliação</h4>
                            <p>{{ $product['rating'] }} de nota média com {{ $product['reviews'] }}.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="section" id="relacionados">
                <div class="section-head">
                    <div>
                        <h3>Produtos relacionados</h3>
                        <p>Cards complementares para continuar navegando sem perder o contexto da compra.</p>
                    </div>
                </div>
                <div class="section-body">
                    <div class="related-grid">
                        @foreach($related as $item)
                            <article class="related-card">
                                <div class="art" style="--a: {{ $item['a'] }}; --b: {{ $item['b'] }};">
                                    <span class="chip">{{ $product['category'] }}</span>
                                    <div>
                                        <h4>{{ $item['title'] }}</h4>
                                        <p>Detalhe clean com visual consistente.</p>
                                    </div>
                                </div>
                                <div class="related-body">
                                    <div class="related-price">{{ $item['price'] }}</div>
                                    <a class="btn btn-secondary" href="{{ route('teste2') }}#produtos">Ver na vitrine</a>
                                </div>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <footer class="footer">
                <div class="footer-grid">
                    <article class="footer-card">
                        <h4>{{ $product['title'] }}</h4>
                        <p>{{ $product['summary'] }}</p>
                    </article>
                    <article class="footer-card">
                        <h4>Navegação</h4>
                        <div class="footer-links">
                            <a href="{{ route('teste2') }}">Vitrine</a>
                            <a href="#sobre">Sobre o produto</a>
                            <a href="#compra">Compra</a>
                            <a href="#relacionados">Relacionados</a>
                        </div>
                    </article>
                </div>

                <div class="footer-bottom">
                    <span>Detalhe estático em visual clean.</span>
                    <span>Baseado na estrutura da página de referência, adaptada ao estilo atual.</span>
                </div>
            </footer>
        </div>
    </div>

    <script>
        (() => {
            const mainImage = document.querySelector('.main-image img');
            const thumbs = document.querySelectorAll('[data-thumb]');
            const quantityInput = document.getElementById('product-quantity');
            const quantityLabel = document.getElementById('product-quantity-label');
            const quantityButtons = document.querySelectorAll('[data-qty]');

            const setQuantity = (value) => {
                const next = Math.max(1, Math.min(99, value));
                if (quantityInput) {
                    quantityInput.value = String(next);
                }
                if (quantityLabel) {
                    quantityLabel.textContent = String(next);
                }
            };

            thumbs.forEach((thumb) => {
                thumb.addEventListener('click', () => {
                    const nextSrc = thumb.getAttribute('data-thumb');
                    if (!mainImage || !nextSrc) {
                        return;
                    }

                    mainImage.src = nextSrc;
                    thumbs.forEach((item) => item.classList.remove('active'));
                    thumb.classList.add('active');
                });
            });

            quantityButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const current = Number(quantityInput?.value ?? 1);
                    const delta = button.getAttribute('data-qty') === '+' ? 1 : -1;
                    setQuantity(current + delta);
                });
            });
        })();
    </script>
</body>
</html>
