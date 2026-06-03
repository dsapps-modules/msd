<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard do Divulgador</title>
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

        .nav-link small { color: var(--muted); font-weight: 700; }

        .logout-form { margin: 0; }
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
            position: relative;
            z-index: 1;
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
        .btn-primary { background: #fff; color: #0f172a; }
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

        .feature-head .status { position: absolute; top: 18px; left: 18px; }
        .feature-head .icon {
            position: absolute;
            right: 18px;
            bottom: 22px;
            font-size: 36px;
        }

        .feature-body { padding: 20px; }
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

        .section-body { padding: 22px 24px 24px; }

        .alert {
            margin-bottom: 16px;
            padding: 14px 16px;
            border-radius: 14px;
            border: 1px solid rgba(37, 99, 235, 0.18);
            background: rgba(37, 99, 235, 0.08);
            color: #0f3d8c;
            font-weight: 700;
        }

        .alert-danger {
            border-color: rgba(239, 68, 68, 0.18);
            background: rgba(239, 68, 68, 0.08);
            color: #b91c1c;
        }

        .campaign-form-grid {
            display: grid;
            grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
            gap: 20px;
        }

        .form-panel {
            padding: 18px;
            border-radius: 22px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #ffffff, #f8fbff);
            display: grid;
            gap: 14px;
        }

        .form-panel h3 {
            margin: 0;
            font-size: 18px;
            letter-spacing: -0.03em;
        }

        .field-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
        }

        .field {
            display: grid;
            gap: 8px;
        }

        .field.full { grid-column: 1 / -1; }

        .field label {
            font-size: 13px;
            font-weight: 800;
            color: var(--text);
        }

        .field input,
        .field textarea {
            width: 100%;
            border-radius: 14px;
            border: 1px solid var(--line);
            background: #fff;
            color: var(--text);
            padding: 12px 14px;
            outline: none;
            transition: border-color .16s ease, box-shadow .16s ease;
        }

        .field textarea {
            min-height: 120px;
            resize: vertical;
        }

        .field input:focus,
        .field textarea:focus {
            border-color: rgba(37, 99, 235, 0.45);
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
        }

        .form-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 4px;
        }

        .btn-danger {
            background: rgba(239, 68, 68, 0.08);
            color: #b91c1c;
            border: 1px solid rgba(239, 68, 68, 0.16);
        }

        .banner-preview {
            display: block;
            width: 100%;
            border-radius: 18px;
            border: 1px solid var(--line);
            overflow: hidden;
            background: #f8fbff;
        }

        .banner-preview img {
            display: block;
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 14px;
        }

        .summary-grid.admin { grid-template-columns: repeat(5, minmax(0, 1fr)); }

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

        .summary-icon.green { background: rgba(22, 163, 74, 0.12); color: var(--green); }
        .summary-icon.amber { background: rgba(245, 158, 11, 0.12); color: var(--amber); }
        .summary-icon.slate { background: rgba(100, 116, 139, 0.12); color: #475569; }
        .summary-icon.emerald { background: rgba(16, 185, 129, 0.12); color: #059669; }

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

        .stack { display: grid; gap: 20px; }

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

        .status-badge.success,
        .status-pill.success { background: rgba(22, 163, 74, 0.12); color: var(--green); }
        .status-badge.warning,
        .status-pill.warning { background: rgba(245, 158, 11, 0.12); color: var(--amber); }
        .status-badge.danger,
        .status-pill.danger { background: rgba(239, 68, 68, 0.12); color: var(--danger); }

        .stock-box { display: grid; gap: 18px; }
        .stock-visual {
            display: grid;
            gap: 14px;
            padding: 18px;
            border-radius: 22px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, #fff, #f7fbff);
        }

        .bar-item { display: grid; gap: 8px; }
        .bar-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--text);
            font-weight: 700;
            font-size: 14px;
            gap: 12px;
        }

        .bar-track {
            width: 100%;
            height: 14px;
            overflow: hidden;
            border-radius: 999px;
            background: #e5eefb;
        }

        .bar-fill { height: 100%; border-radius: inherit; }
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

        .empty-state {
            padding: 24px;
            border-radius: 20px;
            border: 1px dashed var(--line);
            background: #fbfdff;
            color: var(--muted);
            line-height: 1.6;
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
            grid-template-columns: repeat(3, minmax(0, 1fr));
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

            .shell { padding: 14px; }
            .sidebar { position: static; }
        }
    </style>
</head>
<body>
    <div class="shell">
        <div class="layout">
            <aside class="sidebar">
                <div class="brand">
                    <div class="brand-mark">D</div>
                    <div class="brand-text">
                        <strong>Divulgador</strong>
                        <span>Área operacional</span>
                    </div>
                </div>

                <div class="user-card">
                    <span class="role-badge">{{ $roleLabel }}</span>
                    <div class="name">{{ $user->full_name }}</div>
                    <div class="meta">
                        {{ $user->email }}<br>
                        {{ $user->divulgadorPrimaryRoleName() ?? $roleLabel }}
                    </div>
                </div>

                <nav class="sidebar-nav" aria-label="Menu do divulgador">
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
                            <a class="nav-link {{ !empty($item['active']) ? 'active' : '' }}" href="{{ $item['href'] }}" @if(str_starts_with($item['href'], 'http')) target="_blank" rel="noreferrer" @endif>
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
                            <span class="eyebrow">Dashboard do divulgador</span>
                            <span class="mini-badge" style="background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.14);">
                                {{ $user->full_name }}
                            </span>
                        </div>

                        <h1>Acompanhe campanhas, produtos, links e compradores da sua conta.</h1>
                        <p>
                            Esta área segue o mesmo padrão visual do dashboard do fornecedor, com cards,
                            indicadores, tabelas e navegação consistente. O conteúdo é filtrado pela conta
                            atual e o bloco financeiro fica disponível apenas para o perfil admin.
                        </p>

                        <div class="hero-actions">
                            <a class="btn btn-primary" href="#campanhas">Ver campanhas</a>
                            <a class="btn btn-secondary" href="#gerenciar-campanhas">Gerenciar campanhas</a>
                            <a class="btn btn-secondary" href="#produtos">Ver produtos</a>
                            <a class="btn btn-primary" href="#links">Ver links</a>
                            <a class="btn btn-secondary" href="#compradores">Ver compradores</a>
                            @if($isAdmin)
                                <a class="btn btn-secondary" href="#financeiro">Financeiro</a>
                            @endif
                        </div>

                        <div class="hero-chips">
                            <span class="chip">Campanhas: {{ number_format($heroStats['campaigns'] ?? 0, 0, ',', '.') }}</span>
                            <span class="chip">Produtos: {{ number_format($heroStats['products'] ?? 0, 0, ',', '.') }}</span>
                            <span class="chip">Compradores: {{ number_format($heroStats['sales'] ?? 0, 0, ',', '.') }}</span>
                            <span class="chip">Estoque: {{ number_format($heroStats['stock'] ?? 0, 0, ',', '.') }}</span>
                        </div>
                    </article>

                    <article class="feature">
                        @php $featuredCampaign = $featuredCampaigns[0] ?? null; @endphp
                        <div class="feature-head">
                            <span class="status-badge success">Em destaque</span>
                            <div class="icon">📣</div>
                        </div>
                        <div class="feature-body">
                            @if($featuredCampaign)
                                <h2>{{ $featuredCampaign['title'] }}</h2>
                                <p>{{ $featuredCampaign['product'] }}</p>

                                <div class="feature-meta">
                                    <div class="meta-row">
                                        <span class="muted">Período</span>
                                        <strong>{{ $featuredCampaign['period'] ?: 'Não informado' }}</strong>
                                    </div>
                                    <div class="meta-row">
                                        <span class="muted">Meta</span>
                                        <strong>{{ $featuredCampaign['goal'] }}</strong>
                                    </div>
                                    <div class="meta-row">
                                        <span class="muted">Progresso</span>
                                        <strong>{{ $featuredCampaign['progress'] }}</strong>
                                    </div>
                                    <div class="progress" aria-label="Progresso da campanha">
                                        <span style="width: {{ $featuredCampaign['progress_percent'] }}%;"></span>
                                    </div>
                                    <div class="meta-row">
                                        <span class="muted">Status</span>
                                        <span class="status-badge success">{{ $featuredCampaign['status'] }}</span>
                                    </div>
                                </div>
                            @else
                                <h2>Nenhuma campanha encontrada</h2>
                                <p>Cadastre uma campanha para exibir o painel em destaque.</p>
                            @endif

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
                                Os cards abaixo mantêm o mesmo peso visual e a mesma organização usada no dashboard do fornecedor.
                            </p>
                        </div>
                    </div>
                    <div class="section-body">
                        <div class="summary-grid {{ $isAdmin ? 'admin' : '' }}">
                            @foreach($summaryCards as $card)
                                <article class="summary-card">
                                    <div class="summary-icon {{ $card['tone'] ?? 'blue' }}">{{ $card['icon'] ?? '●' }}</div>
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

                <section class="section" id="gerenciar-campanhas">
                    <div class="section-head">
                        <div>
                            <span class="eyebrow">CRUD</span>
                            <h2>Gerenciar campanhas</h2>
                            <p>Crie, edite e exclua campanhas diretamente no dashboard. A lista abaixo usa a mesma base de dados do backend.</p>
                        </div>
                    </div>
                    <div class="section-body">
                        @if(session('status'))
                            <div class="alert">{{ session('status') }}</div>
                        @endif

                        @if($errors->any())
                            <div class="alert alert-danger">
                                {{ $errors->first() }}
                            </div>
                        @endif

                        @php
                            $isEditingCampaign = !empty($campaignForm['id']);
                            $campaignAction = $isEditingCampaign
                                ? route('divulgador.campanhas.update', $campaignForm['id'])
                                : route('divulgador.campanhas.store');
                        @endphp

                        <div class="campaign-form-grid">
                            <div class="form-panel">
                                <h3>{{ $isEditingCampaign ? 'Editar campanha' : 'Nova campanha' }}</h3>
                                <p class="muted">Use este formulário para manter a operação sem sair do dashboard.</p>

                                <form method="POST" action="{{ $campaignAction }}" enctype="multipart/form-data">
                                    @csrf
                                    @if($isEditingCampaign)
                                        @method('PUT')
                                    @endif

                                    <div class="field-grid">
                                        <div class="field full">
                                            <label for="titulo">Título</label>
                                            <input id="titulo" name="titulo" type="text" value="{{ old('titulo', $campaignForm['titulo'] ?? '') }}" placeholder="Ex.: Campanha Alianca de Paz" required>
                                        </div>

                                        <div class="field full">
                                            <label for="objetivo">Objetivo</label>
                                            <textarea id="objetivo" name="objetivo" placeholder="Descreva o objetivo da campanha" required>{{ old('objetivo', $campaignForm['objetivo'] ?? '') }}</textarea>
                                        </div>

                                        <div class="field">
                                            <label for="meta_financeira">Meta financeira</label>
                                            <input id="meta_financeira" name="meta_financeira" type="number" min="0.01" step="0.01" value="{{ old('meta_financeira', $campaignForm['meta_financeira'] ?? '') }}" placeholder="0,00" required>
                                        </div>

                                        <div class="field">
                                            <label for="banner">Banner</label>
                                            <input id="banner" name="banner" type="file" accept="image/*" {{ $isEditingCampaign ? '' : 'required' }}>
                                        </div>

                                        <div class="field">
                                            <label for="data_inicio">Data inicial</label>
                                            <input id="data_inicio" name="data_inicio" type="date" value="{{ old('data_inicio', $campaignForm['data_inicio'] ?? '') }}" required>
                                        </div>

                                        <div class="field">
                                            <label for="data_fim">Data final</label>
                                            <input id="data_fim" name="data_fim" type="date" value="{{ old('data_fim', $campaignForm['data_fim'] ?? '') }}" required>
                                        </div>
                                    </div>

                                    <div class="form-actions">
                                        <button class="btn btn-primary" type="submit">{{ $isEditingCampaign ? 'Salvar alterações' : 'Criar campanha' }}</button>
                                        @if($isEditingCampaign)
                                            <a class="btn btn-secondary" href="{{ route('divulgador.dashboard') }}#gerenciar-campanhas">Cancelar edição</a>
                                        @endif
                                    </div>
                                </form>
                            </div>

                            <div class="form-panel">
                                <h3>Campanhas cadastradas</h3>
                                <p class="muted">Clique em editar para carregar a campanha no formulário acima.</p>

                                @if(!empty($campaignForm['banner_url']))
                                    <div class="banner-preview">
                                        <img src="{{ $campaignForm['banner_url'] }}" alt="Banner da campanha selecionada">
                                    </div>
                                @endif

                                <div class="table-wrap">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Título</th>
                                                <th>Meta</th>
                                                <th>Período</th>
                                                <th>Status</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($campaignRows ?? [] as $campaign)
                                                <tr>
                                                    <td>
                                                        <div>{{ $campaign['title'] }}</div>
                                                        <div class="muted">{{ \Illuminate\Support\Str::limit($campaign['objective'], 52) }}</div>
                                                    </td>
                                                    <td>{{ $campaign['goal'] }}</td>
                                                    <td>{{ $campaign['data_inicio_formatada'] }} - {{ $campaign['data_fim_formatada'] }}</td>
                                                    <td>
                                                        @php
                                                            $campaignStatusClass = $campaign['status'] === 'ativa' ? 'success' : ($campaign['status'] === 'futura' ? 'warning' : 'danger');
                                                        @endphp
                                                        <span class="status-pill {{ $campaignStatusClass }}">{{ $campaign['status'] }}</span>
                                                    </td>
                                                    <td>
                                                        <div class="table-actions">
                                                            <a class="table-chip primary" href="{{ route('divulgador.dashboard', ['edit_campaign' => $campaign['id']]) }}#gerenciar-campanhas">Editar</a>
                                                            <form method="POST" action="{{ route('divulgador.campanhas.destroy', $campaign['id']) }}" onsubmit="return confirm('Excluir esta campanha?');" style="display:inline;">
                                                                @csrf
                                                                @method('DELETE')
                                                                <button type="submit" class="table-chip" style="cursor:pointer;">Excluir</button>
                                                            </form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            @empty
                                                <tr>
                                                    <td colspan="5" class="muted">Nenhuma campanha cadastrada.</td>
                                                </tr>
                                            @endforelse
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-grid">
                    <div class="stack">
                        <section class="section" id="campanhas">
                            <div class="section-head">
                                <div>
                                    <span class="eyebrow">Campanhas</span>
                                    <h2>Campanhas em destaque</h2>
                                    <p>Cards no mesmo espírito visual do dashboard do fornecedor, com meta, progresso e status.</p>
                                </div>
                            </div>
                            <div class="section-body">
                                @if(empty($featuredCampaigns))
                                    <div class="empty-state">
                                        Nenhuma campanha cadastrada ainda. Use a API de campanhas para criar a primeira.
                                    </div>
                                @else
                                    <div class="campaign-grid">
                                        @foreach($featuredCampaigns as $campaign)
                                            <article class="campaign-card">
                                                <div class="topline">
                                                    <div>
                                                        @php
                                                            $campaignStatusClass = $campaign['status'] === 'ativa' ? 'success' : ($campaign['status'] === 'futura' ? 'warning' : 'danger');
                                                        @endphp
                                                        <span class="status-badge {{ $campaignStatusClass }}">{{ $campaign['status'] }}</span>
                                                        <h3>{{ $campaign['title'] }}</h3>
                                                        <p><strong>Produto:</strong> {{ $campaign['product'] }}</p>
                                                        <p><strong>Fornecedor:</strong> {{ $campaign['supplier'] }}</p>
                                                    </div>
                                                </div>

                                                <p><strong>Período:</strong> {{ $campaign['period'] ?: 'Não informado' }}</p>
                                                <p><strong>Meta:</strong> {{ $campaign['goal'] }}</p>
                                                <p><strong>Progresso:</strong> {{ $campaign['progress'] }}</p>

                                                <div class="progress">
                                                    <span style="width: {{ $campaign['progress_percent'] }}%;"></span>
                                                </div>

                                                <div style="display:flex; justify-content:space-between; gap:12px; align-items:center;">
                                                    <span class="muted">{{ $campaign['progress_percent'] }}% concluído</span>
                                                    <a class="btn btn-soft" href="#links">Ver detalhes</a>
                                                </div>
                                            </article>
                                        @endforeach
                                    </div>
                                @endif
                            </div>
                        </section>

                        <section class="section" id="links">
                            <div class="section-head">
                                <div>
                                    <span class="eyebrow">Links</span>
                                    <h2>Links de divulgação</h2>
                                    <p>Endereços prontos para compartilhar com rastreio e comissão.</p>
                                </div>
                            </div>
                            <div class="section-body">
                                <div class="table-wrap">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Campanha</th>
                                                <th>Código</th>
                                                <th>Url</th>
                                                <th>Comissão</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($links ?? [] as $link)
                                                <tr>
                                                    <td>{{ $link['campaign'] }}</td>
                                                    <td>{{ $link['code'] }}</td>
                                                    <td class="muted">{{ \Illuminate\Support\Str::limit($link['url'], 48) }}</td>
                                                    <td>{{ $link['commission'] }}</td>
                                                    <td>
                                                        <span class="status-pill {{ $link['status'] === 'Ativo' ? 'success' : 'warning' }}">
                                                            {{ $link['status'] }}
                                                        </span>
                                                    </td>
                                                </tr>
                                            @empty
                                                <tr>
                                                    <td colspan="5" class="muted">Nenhum link gerado ainda.</td>
                                                </tr>
                                            @endforelse
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        <section class="section" id="compradores">
                            <div class="section-head">
                                <div>
                                    <span class="eyebrow">Compradores</span>
                                    <h2>Compradores recentes</h2>
                                    <p>Registros operacionais vinculados às suas campanhas.</p>
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
                                            @forelse($recentSales as $sale)
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
                                            @empty
                                                <tr>
                                                    <td colspan="6" class="muted">Nenhum comprador registrado.</td>
                                                </tr>
                                            @endforelse
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div class="stack">
                        <section class="section" id="produtos">
                            <div class="section-head">
                                <div>
                                    <span class="eyebrow">Produtos</span>
                                    <h2>Produtos cadastrados recentemente</h2>
                                    <p>Lista com os itens mais recentes vinculados à conta do divulgador.</p>
                                </div>
                            </div>
                            <div class="section-body">
                                <div class="table-wrap">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Produto</th>
                                                <th>Valor</th>
                                                <th>Estoque</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @forelse($recentProducts as $product)
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
                                                </tr>
                                            @empty
                                                <tr>
                                                    <td colspan="5" class="muted">Nenhum produto encontrado.</td>
                                                </tr>
                                            @endforelse
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

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
                                                <strong>{{ $stockSummary['high'] ?? 0 }}</strong>
                                            </div>
                                            <div class="bar-track">
                                                <div class="bar-fill fill-high" style="width: {{ max(20, min(100, (($stockSummary['high'] ?? 0) * 3))) }}%;"></div>
                                            </div>
                                        </div>

                                        <div class="bar-item">
                                            <div class="bar-label">
                                                <span>Produtos com estoque baixo</span>
                                                <strong>{{ $stockSummary['low'] ?? 0 }}</strong>
                                            </div>
                                            <div class="bar-track">
                                                <div class="bar-fill fill-low" style="width: {{ max(20, min(100, (($stockSummary['low'] ?? 0) * 6))) }}%;"></div>
                                            </div>
                                        </div>

                                        <div class="bar-item">
                                            <div class="bar-label">
                                                <span>Produtos sem estoque</span>
                                                <strong>{{ $stockSummary['zero'] ?? 0 }}</strong>
                                            </div>
                                            <div class="bar-track">
                                                <div class="bar-fill fill-zero" style="width: {{ max(20, min(100, (($stockSummary['zero'] ?? 0) * 20))) }}%;"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mini-grid">
                                        <div class="mini-card">
                                            <span class="count">{{ $stockSummary['high'] ?? 0 }}</span>
                                            <span class="label">Estoque alto</span>
                                        </div>
                                        <div class="mini-card">
                                            <span class="count">{{ $stockSummary['low'] ?? 0 }}</span>
                                            <span class="label">Estoque baixo</span>
                                        </div>
                                        <div class="mini-card">
                                            <span class="count">{{ $stockSummary['zero'] ?? 0 }}</span>
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
                                        <h2>Área financeira do divulgador</h2>
                                        <p>Bloco exclusivo para divulgador_admin, com visão de comissão, recebimento e ticket médio.</p>
                                    </div>
                                </div>
                                <div class="section-body">
                                    <div class="finance-grid">
                                        <div class="finance-card">
                                            <span class="label">Comissão estimada</span>
                                            <span class="value">{{ $financial['formatted']['commission_total'] ?? 'R$ 0,00' }}</span>
                                        </div>
                                        <div class="finance-card">
                                            <span class="label">Recebido</span>
                                            <span class="value">{{ $financial['formatted']['received'] ?? 'R$ 0,00' }}</span>
                                        </div>
                                        <div class="finance-card">
                                            <span class="label">Pendente</span>
                                            <span class="value">{{ $financial['formatted']['pending'] ?? 'R$ 0,00' }}</span>
                                        </div>
                                    </div>

                                    <div class="table-wrap">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Comprador</th>
                                                    <th>Produto</th>
                                                    <th>Valor da compra</th>
                                                    <th>Valor líquido divulgador</th>
                                                    <th>Data</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @forelse($recentSales as $sale)
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
                                                @empty
                                                    <tr>
                                                        <td colspan="6" class="muted">Sem registros financeiros.</td>
                                                    </tr>
                                                @endforelse
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
