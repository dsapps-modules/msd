<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vitrine Estática | Coopera</title>
    <style>
        :root {
            --bg: #eef3fb;
            --panel: #ffffff;
            --panel-soft: #f7faff;
            --text: #0f172a;
            --muted: #64748b;
            --line: #dbe4f0;
            --blue: #2563eb;
            --cyan: #38bdf8;
            --green: #16a34a;
            --amber: #f59e0b;
            --danger: #ef4444;
            --violet: #7c3aed;
            --deep: #091224;
            --deep-2: #10244e;
            --shadow: 0 24px 80px rgba(15, 23, 42, 0.12);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
            margin: 0;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: var(--text);
            background:
                radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 24%),
                radial-gradient(circle at top right, rgba(56, 189, 248, 0.10), transparent 18%),
                linear-gradient(180deg, #f8fbff 0%, var(--bg) 100%);
        }

        a { color: inherit; text-decoration: none; }
        img { max-width: 100%; display: block; }

        .shell {
            min-height: 100vh;
            padding: 20px;
        }

        .page {
            max-width: 1480px;
            margin: 0 auto;
            display: grid;
            gap: 18px;
        }

        .topbar,
        .section,
        .footer,
        .nav {
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(219, 228, 240, 0.96);
            border-radius: 28px;
            box-shadow: var(--shadow);
            backdrop-filter: blur(12px);
        }

        .topbar {
            padding: 12px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            flex-wrap: wrap;
        }

        .topbar strong {
            font-size: 13px;
            letter-spacing: .04em;
            text-transform: uppercase;
        }

        .topbar span {
            color: var(--muted);
            font-size: 13px;
        }

        .topbar .pills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 9px 12px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #fff;
            color: #0f3d8c;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: .04em;
            text-transform: uppercase;
        }

        .nav {
            padding: 16px 18px;
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 16px;
            align-items: center;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-mark {
            width: 52px;
            height: 52px;
            border-radius: 18px;
            display: grid;
            place-items: center;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            font-weight: 900;
            letter-spacing: -0.04em;
            box-shadow: 0 16px 30px rgba(37, 99, 235, 0.25);
        }

        .brand-text strong {
            display: block;
            font-size: 18px;
            line-height: 1.1;
        }

        .brand-text span {
            display: block;
            margin-top: 4px;
            color: var(--muted);
            font-size: 13px;
        }

        .nav-search {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 10px;
            align-items: center;
        }

        .search-box {
            display: flex;
            align-items: center;
            gap: 12px;
            min-height: 56px;
            padding: 0 16px;
            border-radius: 18px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
        }

        .search-box input {
            width: 100%;
            border: 0;
            outline: 0;
            background: transparent;
            color: var(--text);
            font: inherit;
            font-size: 15px;
        }

        .search-box input::placeholder { color: #94a3b8; }

        .btn {
            appearance: none;
            border: 0;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            border-radius: 16px;
            padding: 12px 18px;
            min-height: 46px;
            font-weight: 800;
            transition: transform .15s ease, opacity .15s ease, background .15s ease;
        }

        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            box-shadow: 0 16px 30px rgba(37, 99, 235, 0.20);
        }
        .btn-secondary {
            background: rgba(37, 99, 235, 0.08);
            color: #0f3d8c;
            border: 1px solid rgba(37, 99, 235, 0.10);
        }

        .quick-links {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 10px;
        }

        .quick-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-height: 44px;
            padding: 0 14px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #fff;
            color: #1e293b;
            font-weight: 700;
            font-size: 13px;
        }

        .hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
            gap: 18px;
        }

        .hero {
            position: relative;
            overflow: hidden;
            padding: 30px;
            border-radius: 32px;
            background:
                radial-gradient(circle at top right, rgba(56, 189, 248, 0.26), transparent 28%),
                radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.24), transparent 28%),
                linear-gradient(135deg, var(--deep) 0%, var(--deep-2) 52%, #1d4ed8 100%);
            color: #fff;
            box-shadow: var(--shadow);
        }

        .hero::after {
            content: "";
            position: absolute;
            inset: auto -80px -100px auto;
            width: 280px;
            height: 280px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.06);
            filter: blur(10px);
        }

        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            width: fit-content;
            padding: 8px 12px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: .06em;
            text-transform: uppercase;
            background: rgba(255, 255, 255, 0.10);
            color: #dbeafe;
        }

        .hero h1 {
            margin: 18px 0 12px;
            max-width: 700px;
            font-size: clamp(34px, 4.5vw, 62px);
            line-height: .95;
            letter-spacing: -0.05em;
        }

        .hero p {
            margin: 0;
            max-width: 760px;
            color: rgba(226, 232, 240, 0.90);
            font-size: 16px;
            line-height: 1.7;
        }

        .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 22px;
        }

        .hero-search {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 10px;
            margin-top: 22px;
            padding: 14px;
            border-radius: 24px;
            background: rgba(255, 255, 255, 0.10);
            border: 1px solid rgba(255, 255, 255, 0.12);
            position: relative;
            z-index: 1;
        }

        .hero-search input {
            border: 0;
            outline: 0;
            background: rgba(255, 255, 255, 0.10);
            color: #fff;
            border-radius: 16px;
            min-height: 54px;
            padding: 0 16px;
            font: inherit;
        }

        .hero-search input::placeholder { color: rgba(226, 232, 240, 0.72); }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            margin-top: 22px;
            position: relative;
            z-index: 1;
        }

        .stat-card {
            padding: 16px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.10);
            border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .stat-card strong {
            display: block;
            font-size: 24px;
            letter-spacing: -0.04em;
        }

        .stat-card span {
            display: block;
            margin-top: 6px;
            color: rgba(226, 232, 240, 0.82);
            font-size: 13px;
            line-height: 1.5;
        }

        .hero-side {
            display: grid;
            gap: 18px;
        }

        .promo-card,
        .info-card,
        .section,
        .footer-card {
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(219, 228, 240, 0.96);
            border-radius: 28px;
            box-shadow: var(--shadow);
        }

        .promo-card {
            overflow: hidden;
            display: grid;
            grid-template-rows: 210px auto;
        }

        .promo-visual {
            position: relative;
            padding: 18px;
            background:
                radial-gradient(circle at top right, rgba(56, 189, 248, 0.32), transparent 30%),
                linear-gradient(180deg, #dff2ff 0%, #c7e8fb 100%);
        }

        .promo-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.85);
            color: #0f3d8c;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .05em;
        }

        .promo-pill {
            position: absolute;
            right: 18px;
            bottom: 18px;
            padding: 14px 16px;
            border-radius: 18px;
            background: rgba(9, 18, 36, 0.88);
            color: #fff;
            max-width: 180px;
        }

        .promo-pill strong {
            display: block;
            font-size: 18px;
            margin-bottom: 4px;
        }

        .promo-pill span {
            display: block;
            font-size: 13px;
            line-height: 1.5;
            color: rgba(226, 232, 240, 0.85);
        }

        .promo-body {
            padding: 20px;
            display: grid;
            gap: 14px;
        }

        .promo-body h2 {
            margin: 0;
            font-size: 24px;
            letter-spacing: -0.04em;
        }

        .promo-body p {
            margin: 0;
            color: var(--muted);
            line-height: 1.7;
        }

        .promo-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .info-card {
            padding: 20px;
        }

        .info-card h3,
        .section-head h2 {
            margin: 0 0 8px;
            letter-spacing: -0.04em;
        }

        .info-card h3 { font-size: 22px; }
        .info-card p,
        .section-head p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
        }

        .info-grid {
            display: grid;
            gap: 12px;
            margin-top: 16px;
        }

        .info-row {
            padding: 14px;
            border-radius: 18px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
        }

        .info-row strong {
            display: block;
            margin-bottom: 4px;
            font-size: 15px;
        }

        .info-row span {
            color: var(--muted);
            font-size: 13px;
            line-height: 1.5;
        }

        .section {
            overflow: hidden;
        }

        .section-head {
            padding: 22px 24px 16px;
            border-bottom: 1px solid var(--line);
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: flex-start;
            flex-wrap: wrap;
        }

        .section-body {
            padding: 22px 24px 24px;
        }

        .category-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 14px;
        }

        .category-card {
            position: relative;
            overflow: hidden;
            min-height: 176px;
            padding: 18px;
            border-radius: 24px;
            border: 1px solid var(--line);
            background:
                radial-gradient(circle at top right, rgba(255, 255, 255, 0.28), transparent 24%),
                linear-gradient(160deg, rgba(37, 99, 235, 0.08), rgba(255, 255, 255, 0.95));
            display: grid;
            align-content: space-between;
            gap: 14px;
        }

        .category-card::after {
            content: "";
            position: absolute;
            right: -32px;
            bottom: -40px;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: var(--accent, rgba(37, 99, 235, 0.12));
            filter: blur(0);
        }

        .category-card .meta {
            position: relative;
            z-index: 1;
        }

        .category-icon {
            width: 46px;
            height: 46px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            font-size: 20px;
            background: var(--accent-soft, rgba(37, 99, 235, 0.12));
            color: var(--accent, var(--blue));
            margin-bottom: 12px;
        }

        .category-card h3 {
            margin: 0 0 6px;
            font-size: 18px;
            letter-spacing: -0.03em;
        }

        .category-card p {
            margin: 0;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.6;
        }

        .category-card .cta {
            position: relative;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            width: fit-content;
            padding: 9px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.85);
            color: #0f3d8c;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .05em;
        }

        .product-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 16px;
        }

        .product-card {
            overflow: hidden;
            border-radius: 24px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: grid;
            min-height: 100%;
            box-shadow: 0 18px 48px rgba(15, 23, 42, 0.06);
        }

        .product-art {
            min-height: 180px;
            padding: 18px;
            background:
                radial-gradient(circle at top right, rgba(255, 255, 255, 0.3), transparent 30%),
                linear-gradient(135deg, var(--product-a, #2563eb), var(--product-b, #38bdf8));
            position: relative;
            color: #fff;
        }

        .product-art .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.16);
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .05em;
        }

        .product-art .art-title {
            position: absolute;
            left: 18px;
            right: 18px;
            bottom: 18px;
        }

        .product-art h3 {
            margin: 0 0 6px;
            font-size: 22px;
            line-height: 1.05;
            letter-spacing: -0.04em;
        }

        .product-art p {
            margin: 0;
            color: rgba(226, 232, 240, 0.90);
            font-size: 13px;
            line-height: 1.5;
        }

        .product-body {
            padding: 18px;
            display: grid;
            gap: 12px;
        }

        .product-body .topline {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
        }

        .product-body h4 {
            margin: 0;
            font-size: 17px;
            line-height: 1.35;
            letter-spacing: -0.03em;
        }

        .tag {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            width: fit-content;
            padding: 7px 10px;
            border-radius: 999px;
            background: rgba(37, 99, 235, 0.10);
            color: #0f3d8c;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .07em;
        }

        .price-row {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 10px;
        }

        .price-now {
            font-size: 28px;
            font-weight: 900;
            letter-spacing: -0.05em;
        }

        .price-before {
            color: var(--muted);
            text-decoration: line-through;
            font-size: 13px;
        }

        .product-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .mini-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 10px;
            border-radius: 999px;
            background: #f8fbff;
            border: 1px solid var(--line);
            color: #334155;
            font-size: 12px;
            font-weight: 700;
        }

        .product-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 4px;
        }

        .product-actions .btn {
            min-height: 42px;
            padding: 0 14px;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
        }

        .feature-card {
            padding: 18px;
            border-radius: 24px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: grid;
            gap: 12px;
        }

        .feature-icon {
            width: 44px;
            height: 44px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            font-size: 18px;
            background: rgba(37, 99, 235, 0.10);
            color: var(--blue);
        }

        .feature-card h3 {
            margin: 0;
            font-size: 18px;
            letter-spacing: -0.03em;
        }

        .feature-card p {
            margin: 0;
            color: var(--muted);
            line-height: 1.65;
            font-size: 14px;
        }

        .feature-card .cta {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #0f3d8c;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .05em;
        }

        .split {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(340px, 0.92fr);
            gap: 16px;
        }

        .points,
        .support {
            padding: 22px;
            border-radius: 28px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: grid;
            gap: 14px;
        }

        .points h3,
        .support h3 {
            margin: 0;
            font-size: 22px;
            letter-spacing: -0.04em;
        }

        .points p,
        .support p {
            margin: 0;
            color: var(--muted);
            line-height: 1.7;
        }

        .points-list {
            display: grid;
            gap: 10px;
        }

        .points-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 0;
            border-top: 1px solid var(--line);
        }

        .points-row:first-child { border-top: 0; padding-top: 0; }

        .points-row .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-top: 6px;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            flex: none;
        }

        .points-row strong {
            display: block;
            margin-bottom: 3px;
        }

        .points-row span,
        .support .line {
            color: var(--muted);
            font-size: 14px;
            line-height: 1.55;
        }

        .support-grid {
            display: grid;
            gap: 12px;
        }

        .support-item {
            padding: 14px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid var(--line);
        }

        .support-item strong {
            display: block;
            margin-bottom: 4px;
        }

        .support-item span {
            color: var(--muted);
            font-size: 14px;
        }

        .footer {
            padding: 22px;
            display: grid;
            gap: 18px;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 1.1fr .9fr .9fr;
            gap: 16px;
        }

        .footer-card {
            padding: 18px;
        }

        .footer-card h4 {
            margin: 0 0 10px;
            font-size: 16px;
            letter-spacing: -0.03em;
        }

        .footer-links {
            display: grid;
            gap: 10px;
        }

        .footer-links a {
            color: #334155;
            font-size: 14px;
            line-height: 1.5;
        }

        .payment-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .payment {
            padding: 10px 12px;
            border-radius: 12px;
            border: 1px solid var(--line);
            background: #fff;
            font-size: 12px;
            font-weight: 800;
            color: #0f3d8c;
            text-transform: uppercase;
            letter-spacing: .05em;
        }

        .footer-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
            padding-top: 4px;
            color: var(--muted);
            font-size: 13px;
        }

        .muted { color: var(--muted); }

        @media (max-width: 1180px) {
            .hero-grid,
            .split,
            .footer-grid {
                grid-template-columns: 1fr;
            }

            .category-grid,
            .product-grid,
            .feature-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .nav {
                grid-template-columns: 1fr;
            }

            .quick-links {
                justify-content: flex-start;
            }
        }

        @media (max-width: 760px) {
            .shell { padding: 14px; }
            .topbar,
            .nav,
            .hero,
            .section,
            .footer {
                border-radius: 24px;
            }

            .hero {
                padding: 22px;
            }

            .hero-stats,
            .category-grid,
            .product-grid,
            .feature-grid {
                grid-template-columns: 1fr;
            }

            .nav-search,
            .hero-search {
                grid-template-columns: 1fr;
            }

            .hero h1 {
                font-size: clamp(30px, 10vw, 46px);
            }

            .section-head,
            .section-body,
            .footer {
                padding-left: 18px;
                padding-right: 18px;
            }
        }
    </style>
</head>
<body>
@php
    $categories = [
        [
            'title' => 'Shopping',
            'icon' => '◼',
            'description' => 'Tecnologia, utilidades e ofertas para a rotina.',
            'cta' => 'Explorar vitrine',
            'accent' => '#2563eb',
            'accentSoft' => 'rgba(37, 99, 235, 0.14)',
        ],
        [
            'title' => 'Agronegócio',
            'icon' => '▣',
            'description' => 'Ferramentas, insumos e soluções para operação.',
            'cta' => 'Ver oportunidades',
            'accent' => '#16a34a',
            'accentSoft' => 'rgba(22, 163, 74, 0.14)',
        ],
        [
            'title' => 'Saúde',
            'icon' => '✚',
            'description' => 'Bem-estar, cuidado pessoal e itens essenciais.',
            'cta' => 'Acessar coleção',
            'accent' => '#7c3aed',
            'accentSoft' => 'rgba(124, 58, 237, 0.14)',
        ],
        [
            'title' => 'Viagens',
            'icon' => '✈',
            'description' => 'Experiências, destinos e serviços com mais vantagem.',
            'cta' => 'Montar experiência',
            'accent' => '#f59e0b',
            'accentSoft' => 'rgba(245, 158, 11, 0.16)',
        ],
    ];

    $products = [
        [
            'title' => 'Cafeteira Compacta Duo',
            'subtitle' => 'Bebidas quentes para começar o dia com praticidade.',
            'category' => 'Destaque da semana',
            'price' => 'R$ 189,90',
            'oldPrice' => 'R$ 219,90',
            'installments' => 'até 3x de R$ 63,30',
            'points' => '9.495 pts',
            'rating' => '4,9',
            'stock' => 'Pronta entrega',
            'productA' => '#1d4ed8',
            'productB' => '#38bdf8',
        ],
        [
            'title' => 'Kit Bem-Estar Essencial',
            'subtitle' => 'Itens selecionados para autocuidado e rotina saudável.',
            'category' => 'Saúde',
            'price' => 'R$ 129,00',
            'oldPrice' => 'R$ 149,00',
            'installments' => 'até 2x de R$ 64,50',
            'points' => '6.450 pts',
            'rating' => '4,8',
            'stock' => 'Mais pedido',
            'productA' => '#7c3aed',
            'productB' => '#a78bfa',
        ],
        [
            'title' => 'Mochila Travel Pro',
            'subtitle' => 'Organização e resistência para deslocamentos longos.',
            'category' => 'Viagens',
            'price' => 'R$ 239,00',
            'oldPrice' => 'R$ 279,00',
            'installments' => 'até 4x de R$ 59,75',
            'points' => '11.950 pts',
            'rating' => '4,9',
            'stock' => 'Oferta limitada',
            'productA' => '#f59e0b',
            'productB' => '#fbbf24',
        ],
        [
            'title' => 'Ferramenta Multiuso Agro',
            'subtitle' => 'Solução prática para atividades do campo e manutenção.',
            'category' => 'Agronegócio',
            'price' => 'R$ 99,90',
            'oldPrice' => 'R$ 119,90',
            'installments' => 'até 2x de R$ 49,95',
            'points' => '4.995 pts',
            'rating' => '4,7',
            'stock' => 'Alta saída',
            'productA' => '#16a34a',
            'productB' => '#22c55e',
        ],
        [
            'title' => 'Smart Speaker Home',
            'subtitle' => 'Automação, música e assistente de voz no ambiente.',
            'category' => 'Shopping',
            'price' => 'R$ 349,90',
            'oldPrice' => 'R$ 399,90',
            'installments' => 'até 6x de R$ 58,31',
            'points' => '17.495 pts',
            'rating' => '5,0',
            'stock' => 'Novo na loja',
            'productA' => '#0f3d8c',
            'productB' => '#2563eb',
        ],
        [
            'title' => 'Kit Hidratação Premium',
            'subtitle' => 'Rotina de cuidado com foco em conforto e bem-estar.',
            'category' => 'Saúde',
            'price' => 'R$ 79,90',
            'oldPrice' => 'R$ 94,90',
            'installments' => 'até 2x de R$ 39,95',
            'points' => '3.995 pts',
            'rating' => '4,8',
            'stock' => 'Estoque seguro',
            'productA' => '#0891b2',
            'productB' => '#38bdf8',
        ],
        [
            'title' => 'Maleta Office Plus',
            'subtitle' => 'Organização com visual limpo para trabalho e estudo.',
            'category' => 'Shopping',
            'price' => 'R$ 159,90',
            'oldPrice' => 'R$ 189,90',
            'installments' => 'até 3x de R$ 53,30',
            'points' => '7.995 pts',
            'rating' => '4,8',
            'stock' => 'Saída constante',
            'productA' => '#334155',
            'productB' => '#64748b',
        ],
        [
            'title' => 'Experiência Fim de Semana',
            'subtitle' => 'Pacote para descanso, lazer e compra com mais vantagem.',
            'category' => 'Viagens',
            'price' => 'R$ 499,90',
            'oldPrice' => 'R$ 559,90',
            'installments' => 'até 8x de R$ 62,49',
            'points' => '24.995 pts',
            'rating' => '5,0',
            'stock' => 'Seleção premium',
            'productA' => '#1e40af',
            'productB' => '#60a5fa',
        ],
    ];

    $features = [
        [
            'icon' => '◔',
            'title' => 'Compra com saldo e pontos',
            'description' => 'Experiência híbrida inspirada no modelo da vitrine: pagamento facilitado, sem perder a leitura clara do preço.',
        ],
        [
            'icon' => '◫',
            'title' => 'Categorias por experiência',
            'description' => 'Shopping, agro, saúde e viagens aparecem como experiências separadas para orientar a navegação rapidamente.',
        ],
        [
            'icon' => '◉',
            'title' => 'Cards fortes e informativos',
            'description' => 'Cada item traz destaque visual, preço, parcelamento, pontuação e status de disponibilidade.',
        ],
    ];
@endphp

    <div class="shell">
        <div class="page">
            <div class="topbar">
                <div>
                    <strong>Vitrine estática de teste</strong>
                    <span>Rota pública em <code>/teste</code>, sem dependências de API.</span>
                </div>
                <div class="pills">
                    <span class="pill">12x sem juros</span>
                    <span class="pill">Pontos + dinheiro</span>
                    <span class="pill">Categorias por experiência</span>
                </div>
            </div>

            <header class="nav">
                <a class="brand" href="#inicio" aria-label="Ir para o início da vitrine">
                    <div class="brand-mark">C</div>
                    <div class="brand-text">
                        <strong>Coopera Vitrine</strong>
                        <span>Modelo estático com estética do dashboard</span>
                    </div>
                </a>

                <div class="nav-search">
                    <label class="search-box" aria-label="Buscar produtos, experiências ou categorias">
                        <span class="muted">⌕</span>
                        <input type="text" placeholder="Buscar por viagem, tecnologia, saúde, agro..." value="">
                    </label>
                    <a class="btn btn-primary" href="#produtos">Buscar</a>
                </div>

                <div class="quick-links">
                    <a class="quick-link" href="#categorias">Categorias</a>
                    <a class="quick-link" href="#vantagens">Vantagens</a>
                    <a class="quick-link" href="#rodape">Ajuda</a>
                </div>
            </header>

            <section class="hero-grid" id="inicio">
                <article class="hero">
                    <span class="eyebrow">Navegue por experiência</span>
                    <h1>Uma vitrine com aparência de marketplace premium, organizada no mesmo espírito visual dos dashboards.</h1>
                    <p>
                        Esta página é uma simulação estática de storefront: foco em descoberta rápida, cards claros,
                        gradação azul e leitura forte de oferta, parcelamento e pontos.
                    </p>

                    <div class="hero-search">
                        <input type="text" placeholder="Exemplo: cafeteira, mochila, bem-estar, viagem" aria-label="Buscar na vitrine">
                        <a class="btn btn-primary" href="#produtos">Explorar agora</a>
                    </div>

                    <div class="hero-actions">
                        <a class="btn btn-secondary" href="#categorias">Ver categorias</a>
                        <a class="btn btn-secondary" href="#vantagens">Como funciona</a>
                    </div>

                    <div class="hero-stats">
                        <div class="stat-card">
                            <strong>04</strong>
                            <span>macro categorias com navegação por intenção de compra.</span>
                        </div>
                        <div class="stat-card">
                            <strong>08</strong>
                            <span>cards de produtos estáticos com informação de valor e ponto.</span>
                        </div>
                        <div class="stat-card">
                            <strong>12x</strong>
                            <span>referência visual ao parcelamento presente no modelo original.</span>
                        </div>
                    </div>
                </article>

                <aside class="hero-side">
                    <article class="promo-card">
                        <div class="promo-visual">
                            <span class="promo-badge">Destaque da vitrine</span>
                            <div class="promo-pill">
                                <strong>Oferta conectada</strong>
                                <span>Visual de campanha com leitura rápida de preço, desconto e entrega.</span>
                            </div>
                        </div>
                        <div class="promo-body">
                            <h2>Compra com mais contexto e menos ruído.</h2>
                            <p>
                                O layout replica a lógica do Shop Coopera: entrada com experiência, seleção por categoria,
                                destaque de produto e chamada institucional no final.
                            </p>
                            <div class="promo-actions">
                                <a class="btn btn-primary" href="#produtos">Ver ofertas</a>
                                <a class="btn btn-secondary" href="#vantagens">Entender fluxo</a>
                            </div>
                        </div>
                    </article>

                    <article class="info-card">
                        <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Resumo</span>
                        <h3>Estrutura pensada para conversão visual</h3>
                        <p>Sem requisições externas. Tudo estático, responsivo e coerente com a identidade dos dashboards.</p>

                        <div class="info-grid">
                            <div class="info-row">
                                <div>
                                    <strong>Topo com busca</strong>
                                    <span>Entrada clara para explorar o catálogo.</span>
                                </div>
                                <span class="pill">UX</span>
                            </div>
                            <div class="info-row">
                                <div>
                                    <strong>Cards com hierarquia</strong>
                                    <span>Oferta, preço, pontos e CTA no mesmo plano.</span>
                                </div>
                                <span class="pill">Venda</span>
                            </div>
                            <div class="info-row">
                                <div>
                                    <strong>Rodapé institucional</strong>
                                    <span>Suporte, pagamentos e links utilitários.</span>
                                </div>
                                <span class="pill">Fidelidade</span>
                            </div>
                        </div>
                    </article>
                </aside>
            </section>

            <section class="section" id="categorias">
                <div class="section-head">
                    <div>
                        <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Categorias</span>
                        <h2>Navegue por experiência</h2>
                        <p>Quatro entradas principais, com tratamento visual forte e leitura imediata da proposta de compra.</p>
                    </div>
                </div>
                <div class="section-body">
                    <div class="category-grid">
                        @foreach($categories as $category)
                            <article class="category-card" style="--accent: {{ $category['accent'] }}; --accent-soft: {{ $category['accentSoft'] }};">
                                <div class="meta">
                                    <div class="category-icon">{{ $category['icon'] }}</div>
                                    <h3>{{ $category['title'] }}</h3>
                                    <p>{{ $category['description'] }}</p>
                                </div>
                                <span class="cta">{{ $category['cta'] }} →</span>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section class="section" id="produtos">
                <div class="section-head">
                    <div>
                        <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Produtos</span>
                        <h2>Produtos em destaque</h2>
                        <p>Cards estáticos inspirados no catálogo do modelo original, mas com linguagem visual alinhada ao sistema dos dashboards.</p>
                    </div>
                    <a class="btn btn-secondary" href="#rodape">Ver atendimento</a>
                </div>
                <div class="section-body">
                    <div class="product-grid">
                        @foreach($products as $product)
                            <article class="product-card">
                                <div class="product-art" style="--product-a: {{ $product['productA'] }}; --product-b: {{ $product['productB'] }};">
                                    <span class="badge">{{ $product['category'] }}</span>
                                    <div class="art-title">
                                        <h3>{{ $product['title'] }}</h3>
                                        <p>{{ $product['subtitle'] }}</p>
                                    </div>
                                </div>

                                <div class="product-body">
                                    <div class="topline">
                                        <div>
                                            <span class="tag">{{ $product['stock'] }}</span>
                                            <h4>{{ $product['title'] }}</h4>
                                        </div>
                                        <span class="mini-pill">★ {{ $product['rating'] }}</span>
                                    </div>

                                    <div class="price-row">
                                        <span class="price-now">{{ $product['price'] }}</span>
                                        <span class="price-before">{{ $product['oldPrice'] }}</span>
                                    </div>

                                    <div class="product-meta">
                                        <span class="mini-pill">{{ $product['installments'] }}</span>
                                        <span class="mini-pill">ou {{ $product['points'] }}</span>
                                    </div>

                                    <div class="product-actions">
                                        <form method="POST" action="{{ route('carrinho.add') }}" style="display: contents;">
                                            @csrf
                                            <input type="hidden" name="slug" value="{{ \Illuminate\Support\Str::slug($product['title']) }}">
                                            <input type="hidden" name="title" value="{{ $product['title'] }}">
                                            <input type="hidden" name="subtitle" value="{{ $product['subtitle'] ?? '' }}">
                                            <input type="hidden" name="category" value="{{ $product['category'] ?? 'Produto' }}">
                                            <input type="hidden" name="brand" value="{{ $product['brand'] ?? 'Coopera' }}">
                                            <input type="hidden" name="ref" value="{{ $product['ref'] ?? '' }}">
                                            <input type="hidden" name="price" value="{{ $product['price'] ?? 'R$ 0,00' }}">
                                            <input type="hidden" name="old_price" value="{{ $product['oldPrice'] ?? '' }}">
                                            <input type="hidden" name="image" value="{{ $product['image'] ?? 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80' }}">
                                            <input type="hidden" name="stock" value="{{ $product['stock'] ?? 'Em estoque' }}">
                                            <input type="hidden" name="quantity" value="1">
                                            <input type="hidden" name="redirect_to" value="{{ url()->current() }}">
                                            <button class="btn btn-primary" type="submit">Comprar</button>
                                        </form>
                                        <a class="btn btn-secondary" href="{{ route('produto.detalhe', ['slug' => \Illuminate\Support\Str::slug($product['title'])]) }}">Detalhes</a>
                                    </div>
                                </div>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section class="section" id="vantagens">
                <div class="section-head">
                    <div>
                        <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Experiência</span>
                        <h2>Por que esta vitrine funciona bem como demo</h2>
                        <p>A composição segue o mesmo encadeamento do site original: abertura forte, categorias, catálogo e área institucional.</p>
                    </div>
                </div>
                <div class="section-body">
                    <div class="feature-grid">
                        @foreach($features as $feature)
                            <article class="feature-card">
                                <div class="feature-icon">{{ $feature['icon'] }}</div>
                                <h3>{{ $feature['title'] }}</h3>
                                <p>{{ $feature['description'] }}</p>
                                <span class="cta">Ver bloco</span>
                            </article>
                        @endforeach
                    </div>
                </div>
            </section>

            <section class="split">
                <article class="points">
                    <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Pontos</span>
                    <h3>Compra, acúmulo e resgate em linguagem simples</h3>
                    <p>
                        A demo traz o mesmo conceito central do modelo de referência: combinar catálogo com incentivo de fidelidade
                        sem comprometer a clareza do preço.
                    </p>

                    <div class="points-list">
                        <div class="points-row">
                            <div class="dot"></div>
                            <div>
                                <strong>Compre com dinheiro, pontos ou ambos</strong>
                                <span>A interface sugere flexibilidade na hora do pagamento.</span>
                            </div>
                        </div>
                        <div class="points-row">
                            <div class="dot"></div>
                            <div>
                                <strong>Visual orientado para decisão</strong>
                                <span>Preço antigo, preço atual, parcelas e pontos aparecem juntos.</span>
                            </div>
                        </div>
                        <div class="points-row">
                            <div class="dot"></div>
                            <div>
                                <strong>Boas chances de adaptação futura</strong>
                                <span>A estrutura está pronta para trocar os dados estáticos por API depois.</span>
                            </div>
                        </div>
                    </div>

                    <div class="promo-actions">
                        <a class="btn btn-primary" href="#produtos">Explorar catálogo</a>
                        <a class="btn btn-secondary" href="#rodape">Acessar rodapé</a>
                    </div>
                </article>

                <aside class="support">
                    <span class="eyebrow" style="background: rgba(37, 99, 235, 0.10); color: var(--blue);">Ajuda</span>
                    <h3>Atendimento e informações úteis</h3>
                    <p>
                        Bloco institucional inspirado na estrutura do storefront original, mas escrito de forma neutra e sem dependência de conteúdo externo.
                    </p>

                    <div class="support-grid">
                        <div class="support-item">
                            <strong>Central de atendimento</strong>
                            <span>Espaço para dúvidas, protocolos e suporte ao cliente.</span>
                        </div>
                        <div class="support-item">
                            <strong>Pagamentos</strong>
                            <span>Cartão, Pix e combinações de saldo com pontos.</span>
                        </div>
                        <div class="support-item">
                            <strong>Institucional</strong>
                            <span>Quem somos, políticas, segurança e condições.</span>
                        </div>
                    </div>
                </aside>
            </section>

            <footer class="footer" id="rodape">
                <div class="footer-grid">
                    <article class="footer-card">
                        <h4>Coopera Vitrine</h4>
                        <p class="muted" style="margin: 0; line-height: 1.7;">
                            Página estática criada para teste visual em <code>/teste</code>, com estética consistente com os dashboards e composição inspirada no modelo de storefront.
                        </p>
                    </article>

                    <article class="footer-card">
                        <h4>Institucional</h4>
                        <div class="footer-links">
                            <a href="#inicio">Página inicial</a>
                            <a href="#categorias">Categorias</a>
                            <a href="#produtos">Produtos</a>
                            <a href="#vantagens">Vantagens</a>
                        </div>
                    </article>

                    <article class="footer-card">
                        <h4>Formas de pagamento</h4>
                        <div class="payment-row">
                            <span class="payment">Pix</span>
                            <span class="payment">Cartão</span>
                            <span class="payment">Pontos</span>
                            <span class="payment">Saldo</span>
                            <span class="payment">Parcelado</span>
                        </div>
                    </article>
                </div>

                <div class="footer-bottom">
                    <span>Demo estática. Sem integração com catálogo real.</span>
                    <span>Layout pronto para evoluir para API, dados dinâmicos e tracking depois.</span>
                </div>
            </footer>
        </div>
    </div>
</body>
</html>
