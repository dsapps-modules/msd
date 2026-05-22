<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard do Fornecedor</title>
    <style>
        :root {
            --bg: #eef3fb;
            --bg-deep: #091224;
            --bg-mid: #10244e;
            --panel: #ffffff;
            --panel-soft: #f7faff;
            --text: #0f172a;
            --muted: #64748b;
            --line: #dbe4f0;
            --blue: #2563eb;
            --blue-soft: rgba(37, 99, 235, 0.12);
            --cyan: #38bdf8;
            --green: #16a34a;
            --amber: #f59e0b;
            --danger: #ef4444;
            --violet: #7c3aed;
            --shadow: 0 24px 80px rgba(15, 23, 42, 0.12);
        }

        * { box-sizing: border-box; }

        html, body { min-height: 100%; }

        body {
            margin: 0;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background:
                radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 26%),
                radial-gradient(circle at top right, rgba(56, 189, 248, 0.08), transparent 20%),
                linear-gradient(180deg, #f7faff 0%, var(--bg) 100%);
            color: var(--text);
        }

        a { color: inherit; text-decoration: none; }
        button, input { font: inherit; }

        .shell {
            min-height: 100vh;
            padding: 22px;
        }

        .layout {
            max-width: 1480px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 280px minmax(0, 1fr);
            gap: 20px;
            align-items: start;
        }

        .sidebar,
        .panel {
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(219, 228, 240, 0.96);
            border-radius: 26px;
            box-shadow: var(--shadow);
            backdrop-filter: blur(12px);
        }

        .sidebar {
            position: sticky;
            top: 22px;
            padding: 20px;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
            padding-bottom: 18px;
            border-bottom: 1px solid var(--line);
            margin-bottom: 18px;
        }

        .brand-mark {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            font-size: 20px;
            font-weight: 800;
            box-shadow: 0 16px 30px rgba(37, 99, 235, 0.25);
        }

        .brand-text strong {
            display: block;
            font-size: 16px;
            line-height: 1.1;
        }

        .brand-text span {
            display: block;
            margin-top: 4px;
            color: var(--muted);
            font-size: 13px;
        }

        .user-card {
            display: grid;
            gap: 10px;
            padding: 16px;
            border-radius: 20px;
            background: linear-gradient(180deg, #f8fbff, #eef5ff);
            border: 1px solid var(--line);
            margin-bottom: 18px;
        }

        .user-card .name {
            font-weight: 800;
            letter-spacing: -0.02em;
        }

        .user-card .meta {
            color: var(--muted);
            font-size: 13px;
            line-height: 1.6;
        }

        .role-badge,
        .eyebrow,
        .mini-badge {
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
        }

        .role-badge {
            background: rgba(37, 99, 235, 0.10);
            color: var(--blue);
        }

        .eyebrow {
            background: rgba(37, 99, 235, 0.10);
            color: var(--blue);
        }

        .sidebar-nav {
            display: grid;
            gap: 8px;
        }

        .nav-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            min-height: 48px;
            padding: 12px 14px;
            border-radius: 16px;
            border: 1px solid transparent;
            background: transparent;
            color: #1e293b;
            font-weight: 700;
            transition: all .16s ease;
        }

        .nav-link:hover,
        .nav-link.active {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.10), rgba(56, 189, 248, 0.12));
            border-color: rgba(37, 99, 235, 0.14);
            color: #0f3d8c;
            transform: translateX(2px);
        }

        .nav-link small {
            color: var(--muted);
            font-weight: 700;
        }

        .logout-form {
            margin: 0;
        }

        .logout-form button {
            width: 100%;
            border: 0;
            background: transparent;
            cursor: pointer;
            text-align: left;
        }

        .main {
            display: grid;
            gap: 20px;
        }

        .hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.2fr) minmax(340px, 0.8fr);
            gap: 20px;
        }

        .hero {
            position: relative;
            overflow: hidden;
            padding: 30px;
            border-radius: 28px;
            background:
                radial-gradient(circle at top right, rgba(56, 189, 248, 0.25), transparent 32%),
                radial-gradient(circle at bottom left, rgba(37, 99, 235, 0.24), transparent 28%),
                linear-gradient(135deg, #091224 0%, #10244e 52%, #1d4ed8 100%);
            color: #fff;
            box-shadow: var(--shadow);
        }

        .hero::after {
            content: '';
            position: absolute;
            inset: auto -70px -90px auto;
            width: 240px;
            height: 240px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.06);
            filter: blur(10px);
        }

        .hero-top {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 1;
        }

        .hero h1 {
            margin: 18px 0 12px;
            max-width: 700px;
            font-size: clamp(32px, 4vw, 54px);
            line-height: .98;
            letter-spacing: -0.04em;
        }

        .hero p {
            margin: 0;
            max-width: 720px;
            color: rgba(226, 232, 240, 0.88);
            font-size: 16px;
            line-height: 1.7;
        }

        .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 22px;
        }

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
            background: #fff;
            color: #0f172a;
        }
        .btn-secondary {
            background: rgba(255, 255, 255, 0.10);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.14);
        }
        .btn-soft {
            background: rgba(37, 99, 235, 0.08);
            color: #0f3d8c;
            border: 1px solid rgba(37, 99, 235, 0.10);
        }

        .hero-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 22px;
            position: relative;
            z-index: 1;
        }

        .chip {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 14px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.14);
            color: #fff;
            font-weight: 700;
            font-size: 13px;
        }

        .feature {
            display: grid;
            grid-template-rows: auto 1fr;
            overflow: hidden;
            border-radius: 28px;
            background: var(--panel);
            border: 1px solid var(--line);
            box-shadow: var(--shadow);
        }

        .feature-head {
            padding: 18px 20px 12px;
            background: linear-gradient(180deg, #dff2ff 0%, #c7e8fb 100%);
            min-height: 220px;
            position: relative;
        }

        .feature-head .status {
            position: absolute;
            top: 18px;
            left: 18px;
        }

        .feature-head .icon {
            position: absolute;
            right: 18px;
            bottom: 22px;
            font-size: 36px;
        }

        .feature-body {
            padding: 20px;
        }

        .feature-body h2 {
            margin: 0 0 8px;
            font-size: 24px;
            letter-spacing: -0.03em;
        }

        .feature-body p {
            margin: 0 0 12px;
            color: var(--muted);
            line-height: 1.6;
        }

        .feature-meta {
            display: grid;
            gap: 10px;
            margin: 16px 0 18px;
        }

        .meta-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            font-size: 14px;
        }

        .progress {
            width: 100%;
            height: 12px;
            overflow: hidden;
            border-radius: 999px;
            background: #e5eefb;
        }

        .progress > span {
            display: block;
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
        }

        .section {
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(219, 228, 240, 0.96);
            border-radius: 28px;
            box-shadow: var(--shadow);
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

        .section-head h2 {
            margin: 0 0 8px;
            font-size: 20px;
            letter-spacing: -0.03em;
        }

        .section-head p {
            margin: 0;
            color: var(--muted);
            line-height: 1.6;
            max-width: 900px;
        }

        .section-body {
            padding: 22px 24px 24px;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 14px;
        }

        .summary-grid.admin {
            grid-template-columns: repeat(6, minmax(0, 1fr));
        }

        .summary-card {
            padding: 18px;
            border-radius: 22px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #ffffff, var(--panel-soft));
            min-height: 138px;
            display: grid;
            gap: 14px;
        }

        .summary-icon {
            width: 42px;
            height: 42px;
            display: grid;
            place-items: center;
            border-radius: 14px;
            font-size: 20px;
            background: var(--blue-soft);
            color: var(--blue);
        }

        .summary-icon.slate { background: rgba(100, 116, 139, 0.12); color: #475569; }
        .summary-icon.green { background: rgba(22, 163, 74, 0.12); color: var(--green); }
        .summary-icon.amber { background: rgba(245, 158, 11, 0.12); color: var(--amber); }
        .summary-icon.emerald { background: rgba(16, 185, 129, 0.12); color: #059669; }
        .summary-icon.violet { background: rgba(124, 58, 237, 0.12); color: var(--violet); }

        .summary-label {
            color: var(--muted);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .08em;
            font-weight: 800;
            margin-bottom: 8px;
        }

        .summary-value {
            font-size: 26px;
            font-weight: 900;
            letter-spacing: -0.04em;
        }

        .summary-hint {
            color: var(--muted);
            font-size: 13px;
            line-height: 1.55;
        }

        .content-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
            gap: 20px;
        }

        .stack {
            display: grid;
            gap: 20px;
        }

        .campaign-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
        }

        .campaign-card {
            padding: 18px;
            border-radius: 22px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f8fbff);
            display: grid;
            gap: 14px;
        }

        .campaign-card .topline {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            align-items: flex-start;
        }

        .campaign-card h3 {
            margin: 0 0 6px;
            font-size: 18px;
            letter-spacing: -0.03em;
        }

        .campaign-card p {
            margin: 0;
            color: var(--muted);
            line-height: 1.6;
            font-size: 14px;
        }

        .tone-blue { background: rgba(37, 99, 235, 0.10); color: var(--blue); }
        .tone-green { background: rgba(22, 163, 74, 0.10); color: var(--green); }
        .tone-amber { background: rgba(245, 158, 11, 0.12); color: var(--amber); }
        .tone-slate { background: rgba(100, 116, 139, 0.12); color: #475569; }
        .tone-emerald { background: rgba(16, 185, 129, 0.12); color: #059669; }
        .tone-violet { background: rgba(124, 58, 237, 0.12); color: var(--violet); }

        .status-badge,
        .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 800;
            white-space: nowrap;
        }

        .status-badge.success { background: rgba(22, 163, 74, 0.12); color: var(--green); }
        .status-badge.warning { background: rgba(245, 158, 11, 0.12); color: var(--amber); }
        .status-badge.danger { background: rgba(239, 68, 68, 0.12); color: var(--danger); }

        .stock-box {
            display: grid;
            gap: 18px;
        }

        .stock-visual {
            display: grid;
            gap: 14px;
            padding: 18px;
            border-radius: 22px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f7fbff);
        }

        .bar-item {
            display: grid;
            gap: 8px;
        }

        .bar-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--text);
            font-weight: 700;
            font-size: 14px;
        }

        .bar-track {
            width: 100%;
            height: 14px;
            overflow: hidden;
            border-radius: 999px;
            background: #e5eefb;
        }

        .bar-fill {
            height: 100%;
            border-radius: inherit;
        }

        .fill-high { background: linear-gradient(135deg, #16a34a, #22c55e); }
        .fill-low { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
        .fill-zero { background: linear-gradient(135deg, #ef4444, #fb7185); }

        .mini-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
        }

        .mini-card {
            padding: 16px;
            border-radius: 18px;
            border: 1px solid var(--line);
            background: #fff;
        }

        .mini-card .count {
            display: block;
            font-size: 26px;
            font-weight: 900;
            letter-spacing: -0.04em;
        }

        .mini-card .label {
            display: block;
            margin-top: 6px;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.55;
        }

        .table-wrap {
            overflow-x: auto;
            border-radius: 22px;
            border: 1px solid var(--line);
            background: #fff;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 940px;
        }

        th, td {
            padding: 14px 12px;
            border-bottom: 1px solid rgba(219, 228, 240, 0.85);
            text-align: left;
            vertical-align: middle;
            font-size: 13px;
        }

        th {
            position: sticky;
            top: 0;
            background: #f8fbff;
            color: #334155;
            text-transform: uppercase;
            letter-spacing: .06em;
            font-size: 11px;
            z-index: 1;
        }

        tr:last-child td { border-bottom: 0; }

        .table-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .table-chip {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 34px;
            padding: 8px 12px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: #f8fbff;
            color: #0f3d8c;
            font-weight: 800;
            font-size: 12px;
        }

        .table-chip.primary {
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            border-color: transparent;
        }

        .muted { color: var(--muted); }

        .finance-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 14px;
            margin-bottom: 18px;
        }

        .finance-card {
            padding: 18px;
            border-radius: 22px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #ffffff, #f8fbff);
            display: grid;
            gap: 8px;
        }

        .finance-card .label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: var(--muted);
            font-weight: 800;
        }

        .finance-card .value {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: -0.03em;
        }

        @media (max-width: 1260px) {
            .layout,
            .hero-grid,
            .content-grid {
                grid-template-columns: 1fr;
            }

            .summary-grid.admin {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }

            .finance-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 900px) {
            .summary-grid,
            .summary-grid.admin,
            .campaign-grid,
            .finance-grid,
            .mini-grid {
                grid-template-columns: 1fr;
            }

            .shell {
                padding: 14px;
            }

            .sidebar {
                position: static;
            }
        }
    </style>
</head>
<body>
    <div class="shell">
        <div class="layout">
            <aside class="sidebar">
                <div class="brand">
                    <div class="brand-mark">F</div>
                    <div class="brand-text">
                        <strong>Fornecedor</strong>
                        <span>Área operacional</span>
                    </div>
                </div>

                <div class="user-card">
                    <span class="role-badge">{{ $roleLabel }}</span>
                    <div class="name">{{ $user->full_name }}</div>
                    <div class="meta">
                        {{ $user->email }}<br>
                        {{ $user->accountPrimaryRoleName() }}
                    </div>
                </div>

                <nav class="sidebar-nav" aria-label="Menu do fornecedor">
                    @foreach($menuItems as $item)
                        @if(($item['method'] ?? 'get') === 'post')
                            <form class="logout-form" method="POST" action="{{ $item['href'] }}">
                                @csrf
                                <button type="submit" class="nav-link">
                                    <span>{{ $item['label'] }}</span>
                                    <small>Sair</small>
                                </button>
                            </form>
                        @else
                            <a class="nav-link {{ !empty($item['active']) ? 'active' : '' }}" href="{{ $item['href'] }}">
                                <span>{{ $item['label'] }}</span>
                                <small>></small>
                            </a>
                        @endif
                    @endforeach
                </nav>
            </aside>

            <main class="main">
                <section class="hero-grid">
                    <article class="hero">
                        <div class="hero-top">
                            <span class="eyebrow">Dashboard do fornecedor</span>
                            <span class="mini-badge" style="background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.14);">
                                {{ $user->full_name }}
                            </span>
                        </div>

                        <h1>Acompanhe seus produtos, estoque, campanhas e desempenho de vendas.</h1>
                        <p>
                            Esta área segue o mesmo padrão visual do dashboard dos divulgadores, com cards,
                            indicadores, tabelas e navegação consistente. O conteúdo é filtrado pelo fornecedor
                            logado e a área financeira fica disponível apenas para o perfil admin.
                        </p>

                        <div class="hero-actions">
                            <a class="btn btn-primary" href="{{ route('fornecedor.produtos.importar') }}">Importar produtos por Excel</a>
                            <a class="btn btn-secondary" href="{{ route('fornecedor.produtos.modelo') }}">Baixar modelo</a>
                            <a class="btn btn-secondary" href="#campanhas">Ver campanhas</a>
                        </div>

                        <div class="hero-chips">
                            <span class="chip">Produtos: {{ number_format($metrics['products_count'], 0, ',', '.') }}</span>
                            <span class="chip">Campanhas: {{ number_format($metrics['campaigns_active'], 0, ',', '.') }}</span>
                            <span class="chip">Vendas: {{ number_format($metrics['sales_count'], 0, ',', '.') }}</span>
                            <span class="chip">Estoque: {{ number_format($metrics['stock_total'], 0, ',', '.') }}</span>
                        </div>
                    </article>

                    <article class="feature">
                        <div class="feature-head">
                            <span class="status-badge success">Em destaque</span>
                            <div class="icon">📣</div>
                        </div>
                        <div class="feature-body">
                            <h2>{{ $featuredCampaigns[0]['name'] }}</h2>
                            <p>{{ $featuredCampaigns[0]['product'] }}</p>

                            <div class="feature-meta">
                                <div class="meta-row">
                                    <span class="muted">Período</span>
                                    <strong>{{ $featuredCampaigns[0]['period'] }}</strong>
                                </div>
                                <div class="meta-row">
                                    <span class="muted">Meta</span>
                                    <strong>{{ $featuredCampaigns[0]['goal'] }}</strong>
                                </div>
                                <div class="meta-row">
                                    <span class="muted">Progresso</span>
                                    <strong>{{ $featuredCampaigns[0]['progress'] }}</strong>
                                </div>
                                <div class="progress" aria-label="Progresso da campanha">
                                    <span style="width: {{ $featuredCampaigns[0]['progress_percent'] }}%;"></span>
                                </div>
                                <div class="meta-row">
                                    <span class="muted">Status</span>
                                    <span class="status-badge success">{{ $featuredCampaigns[0]['status'] }}</span>
                                </div>
                            </div>

                            <a class="btn btn-soft" href="#campanhas">Ver detalhes</a>
                        </div>
                    </article>
                </section>

                <section class="section" id="resumo">
                    <div class="section-head">
                        <div>
                            <span class="eyebrow">Indicadores gerais</span>
                            <h2>Resumo operacional</h2>
                            <p>
                                Os cards abaixo mantêm o mesmo peso visual e a mesma organização usada no dashboard dos divulgadores.
                            </p>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="summary-grid {{ $isAdmin ? 'admin' : '' }}">
                            @foreach($summaryCards as $card)
                                <article class="summary-card">
                                    <div class="summary-icon {{ $card['tone'] }}">{{ $card['icon'] }}</div>
                                    <div>
                                        <div class="summary-label">{{ $card['label'] }}</div>
                                        <div class="summary-value">{{ $card['value'] }}</div>
                                        <div class="summary-hint">{{ $card['hint'] }}</div>
                                    </div>
                                </article>
                            @endforeach
                        </div>
                    </div>
                </section>

                <section class="content-grid">
                    <div class="stack">
                        <section class="section" id="campanhas">
                            <div class="section-head">
                                <div>
                                    <span class="eyebrow">Campanhas</span>
                                    <h2>Produtos e campanhas em destaque</h2>
                                    <p>Cards no mesmo espírito visual dos divulgadores, com meta, progresso e status.</p>
                                </div>
                            </div>
                            <div class="section-body">
                                <div class="campaign-grid">
                                    @foreach($featuredCampaigns as $campaign)
                                        <article class="campaign-card">
                                            <div class="topline">
                                                <div>
                                                    <span class="status-badge success">{{ $campaign['status'] }}</span>
                                                    <h3>{{ $campaign['name'] }}</h3>
                                                    <p><strong>Produto:</strong> {{ $campaign['product'] }}</p>
                                                </div>
                                            </div>

                                            <p><strong>Período:</strong> {{ $campaign['period'] }}</p>
                                            <p><strong>Meta:</strong> {{ $campaign['goal'] }}</p>
                                            <p><strong>Progresso:</strong> {{ $campaign['progress'] }}</p>

                                            <div class="progress">
                                                <span style="width: {{ $campaign['progress_percent'] }}%;"></span>
                                            </div>

                                            <div style="display:flex; justify-content:space-between; gap:12px; align-items:center;">
                                                <span class="muted">{{ $campaign['progress_percent'] }}% concluído</span>
                                                <a class="btn btn-soft" href="#vendas">Ver detalhes</a>
                                            </div>
                                        </article>
                                    @endforeach
                                </div>
                            </div>
                        </section>

                        <section class="section" id="produtos">
                            <div class="section-head">
                                <div>
                                    <span class="eyebrow">Produtos</span>
                                    <h2>Produtos cadastrados recentemente</h2>
                                    <p>Lista com os itens mais recentes do fornecedor logado.</p>
                                </div>
                            </div>
                            <div class="section-body">
                                <div class="table-wrap">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Produto</th>
                                                <th>Valor de venda</th>
                                                <th>Estoque reservado</th>
                                                <th>Status</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($recentProducts as $product)
                                                <tr>
                                                    <td>{{ $product['codigo'] }}</td>
                                                    <td>{{ $product['product'] }}</td>
                                                    <td>{{ $product['value'] }}</td>
                                                    <td>{{ number_format($product['stock'], 0, ',', '.') }}</td>
                                                    <td>
                                                        <span class="status-pill {{ $product['status_class'] === 'danger' ? 'danger' : 'success' }}">
                                                            {{ $product['status'] }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div class="table-actions">
                                                            <a class="table-chip primary" href="#produtos">Ver</a>
                                                            <a class="table-chip" href="{{ route('fornecedor.produtos.importar') }}">Editar</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        <section class="section" id="vendas">
                            <div class="section-head">
                                <div>
                                    <span class="eyebrow">Vendas</span>
                                    <h2>Vendas recentes</h2>
                                    <p>
                                        Registros operacionais vinculados aos produtos do fornecedor.
                                        @unless($isAdmin)
                                            Os valores financeiros ficam ocultos para o perfil colaborador.
                                        @endunless
                                    </p>
                                </div>
                            </div>
                            <div class="section-body">
                                <div class="table-wrap">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Comprador</th>
                                                <th>Produto</th>
                                                <th>Divulgador</th>
                                                @if($isAdmin)
                                                    <th>Valor da compra</th>
                                                @else
                                                    <th>Status operacional</th>
                                                @endif
                                                <th>Data</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($recentSales as $sale)
                                                <tr>
                                                    <td>{{ $sale['buyer'] }}</td>
                                                    <td>{{ $sale['product'] }}</td>
                                                    <td>{{ $sale['divulgador'] }}</td>
                                                    @if($isAdmin)
                                                        <td>{{ $sale['value'] }}</td>
                                                    @else
                                                        <td class="muted">Operacional</td>
                                                    @endif
                                                    <td>{{ $sale['date'] }}</td>
                                                    <td>
                                                        <span class="status-pill {{ $sale['status'] === 'Recebido' ? 'success' : 'warning' }}">
                                                            {{ $sale['status'] }}
                                                        </span>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="stack">
                        <section class="section" id="estoque">
                            <div class="section-head">
                                <div>
                                    <span class="eyebrow">Estoque</span>
                                    <h2>Indicador visual de estoque</h2>
                                    <p>Leitura rápida para produtos com estoque alto, baixo e sem estoque.</p>
                                </div>
                            </div>
                            <div class="section-body">
                                <div class="stock-box">
                                    <div class="stock-visual">
                                        <div class="bar-item">
                                            <div class="bar-label">
                                                <span>Produtos com estoque alto</span>
                                                <strong>{{ $stockSummary['high'] }}</strong>
                                            </div>
                                            <div class="bar-track">
                                                <div class="bar-fill fill-high" style="width: {{ max(20, min(100, $stockSummary['high'] * 3)) }}%;"></div>
                                            </div>
                                        </div>

                                        <div class="bar-item">
                                            <div class="bar-label">
                                                <span>Produtos com estoque baixo</span>
                                                <strong>{{ $stockSummary['low'] }}</strong>
                                            </div>
                                            <div class="bar-track">
                                                <div class="bar-fill fill-low" style="width: {{ max(20, min(100, $stockSummary['low'] * 6)) }}%;"></div>
                                            </div>
                                        </div>

                                        <div class="bar-item">
                                            <div class="bar-label">
                                                <span>Produtos sem estoque</span>
                                                <strong>{{ $stockSummary['zero'] }}</strong>
                                            </div>
                                            <div class="bar-track">
                                                <div class="bar-fill fill-zero" style="width: {{ max(20, min(100, $stockSummary['zero'] * 20)) }}%;"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mini-grid">
                                        <div class="mini-card">
                                            <span class="count">{{ $stockSummary['high'] }}</span>
                                            <span class="label">Estoque alto</span>
                                        </div>
                                        <div class="mini-card">
                                            <span class="count">{{ $stockSummary['low'] }}</span>
                                            <span class="label">Estoque baixo</span>
                                        </div>
                                        <div class="mini-card">
                                            <span class="count">{{ $stockSummary['zero'] }}</span>
                                            <span class="label">Sem estoque</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        @if($isAdmin)
                            <section class="section" id="financeiro">
                                <div class="section-head">
                                    <div>
                                        <span class="eyebrow">Financeiro</span>
                                        <h2>Área financeira do fornecedor</h2>
                                        <p>Bloco exclusivo para fornecedor_admin, com visão de saldo, recebimento e ticket médio.</p>
                                    </div>
                                </div>
                                <div class="section-body">
                                    <div class="finance-grid">
                                        <div class="finance-card">
                                            <span class="label">Valor total vendido</span>
                                            <span class="value">{{ $financial['formatted']['total_sold'] ?? 'R$ 0,00' }}</span>
                                        </div>
                                        <div class="finance-card">
                                            <span class="label">Valor já recebido</span>
                                            <span class="value">{{ $financial['formatted']['received'] ?? 'R$ 0,00' }}</span>
                                        </div>
                                        <div class="finance-card">
                                            <span class="label">Valor pendente</span>
                                            <span class="value">{{ $financial['formatted']['pending'] ?? 'R$ 0,00' }}</span>
                                        </div>
                                        <div class="finance-card">
                                            <span class="label">Ticket médio</span>
                                            <span class="value">{{ $financial['formatted']['ticket_avg'] ?? 'R$ 0,00' }}</span>
                                        </div>
                                    </div>

                                    <div class="table-wrap">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Comprador</th>
                                                    <th>Produto</th>
                                                    <th>Valor da compra</th>
                                                    <th>Valor líquido fornecedor</th>
                                                    <th>Data</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach($recentSales as $sale)
                                                    <tr>
                                                        <td>{{ $sale['buyer'] }}</td>
                                                        <td>{{ $sale['product'] }}</td>
                                                        <td>{{ $sale['value'] }}</td>
                                                        <td>{{ $sale['value'] }}</td>
                                                        <td>{{ $sale['date'] }}</td>
                                                        <td>
                                                            <span class="status-pill {{ $sale['status'] === 'Recebido' ? 'success' : 'warning' }}">
                                                                {{ $sale['status'] }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        @endif
                    </div>
                </section>
            </main>
        </div>
    </div>
</body>
</html>
