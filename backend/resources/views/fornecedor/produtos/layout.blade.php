<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Produtos do Fornecedor' }}</title>
    <style>
        :root {
            --bg: #0f172a;
            --panel: #111827;
            --panel-2: #1f2937;
            --text: #e5e7eb;
            --muted: #9ca3af;
            --accent: #22c55e;
            --danger: #ef4444;
            --border: rgba(255,255,255,.08);
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: linear-gradient(180deg, #0b1220 0%, #111827 100%);
            color: var(--text);
        }
        a { color: inherit; text-decoration: none; }
        .wrap { max-width: 1180px; margin: 0 auto; padding: 24px; }
        .nav {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
        }
        .nav-links { display: flex; flex-wrap: wrap; gap: 10px; }
        .chip, .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
            border: 1px solid var(--border);
            padding: 10px 14px;
            background: rgba(255,255,255,.04);
        }
        .btn.primary { background: var(--accent); color: #052e16; border-color: transparent; font-weight: 700; }
        .btn.danger { background: var(--danger); color: white; border-color: transparent; }
        .panel {
            background: rgba(17,24,39,.92);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 18px 48px rgba(0,0,0,.22);
        }
        .grid { display: grid; gap: 16px; }
        .grid.cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid.cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td {
            text-align: left;
            padding: 12px 10px;
            border-bottom: 1px solid var(--border);
            vertical-align: top;
        }
        .muted { color: var(--muted); }
        .alert {
            padding: 12px 14px;
            border-radius: 14px;
            margin-bottom: 16px;
            border: 1px solid var(--border);
        }
        .alert.success { background: rgba(34,197,94,.12); }
        .alert.error { background: rgba(239,68,68,.12); }
        .field label { display: block; margin-bottom: 6px; color: #d1d5db; }
        .field input, .field textarea {
            width: 100%;
            border-radius: 14px;
            border: 1px solid var(--border);
            padding: 12px 14px;
            background: rgba(255,255,255,.03);
            color: var(--text);
        }
        .field textarea { min-height: 120px; resize: vertical; }
        .actions { display: flex; gap: 8px; flex-wrap: wrap; }
        @media (max-width: 900px) {
            .grid.cols-2, .grid.cols-4 { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="nav">
            <div>
                <div class="muted" style="font-size: 12px; text-transform: uppercase; letter-spacing: .12em;">Mercado Solidário</div>
                <h1 style="margin: 6px 0 0;">{{ $title ?? 'Produtos do Fornecedor' }}</h1>
            </div>
            <div class="nav-links">
                <a class="chip" href="{{ route('fornecedor.dashboard') }}">Dashboard</a>
                <a class="chip" href="{{ route('fornecedor.produtos.index') }}">Produtos</a>
                <a class="chip" href="{{ route('fornecedor.produtos.importar') }}">Importar</a>
                <a class="chip" href="{{ route('fornecedor.produtos.create') }}">Novo produto</a>
            </div>
        </div>

        @if (session('success'))
            <div class="alert success">{{ session('success') }}</div>
        @endif

        @if ($errors->any())
            <div class="alert error">
                <strong>Corrija os campos abaixo.</strong>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @yield('content')
    </div>
</body>
</html>
