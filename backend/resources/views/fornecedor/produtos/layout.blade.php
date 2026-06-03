<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Produtos do Fornecedor' }}</title>
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
            --danger: #ef4444;
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
        button, input, textarea, select { font: inherit; }

        .wrap {
            max-width: 1480px;
            margin: 0 auto;
            padding: 22px;
        }

        .nav {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .nav-links {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .chip, .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
            padding: 10px 14px;
            border: 1px solid transparent;
            transition: all .16s ease;
        }

        .chip {
            background: rgba(255, 255, 255, 0.86);
            border-color: var(--line);
            font-weight: 700;
        }

        .chip:hover {
            transform: translateY(-1px);
            border-color: rgba(37, 99, 235, 0.18);
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
        }

        .btn {
            font-weight: 800;
            letter-spacing: -0.01em;
            background: rgba(255, 255, 255, 0.88);
            color: var(--text);
            border-color: var(--line);
        }

        .btn:hover {
            transform: translateY(-1px);
            border-color: rgba(37, 99, 235, 0.18);
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
        }

        .btn.primary {
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            color: #fff;
            box-shadow: 0 16px 30px rgba(37, 99, 235, 0.22);
        }

        .btn.primary:hover { transform: translateY(-1px); }

        .btn.danger {
            background: var(--danger);
            color: #fff;
        }

        .btn.ghost {
            background: rgba(255, 255, 255, 0.8);
            color: var(--text);
            border-color: var(--line);
        }

        .btn.ghost:hover {
            border-color: rgba(37, 99, 235, 0.18);
        }

        .panel {
            background: rgba(255, 255, 255, 0.94);
            border: 1px solid rgba(219, 228, 240, 0.96);
            border-radius: 26px;
            padding: 22px;
            box-shadow: var(--shadow);
            backdrop-filter: blur(12px);
        }

        .grid { display: grid; gap: 16px; }
        .grid.cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid.cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

        .table {
            width: 100%;
            border-collapse: collapse;
            overflow: hidden;
        }

        .table th,
        .table td {
            text-align: left;
            padding: 12px 10px;
            border-bottom: 1px solid var(--line);
            vertical-align: top;
        }

        .table th {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: var(--muted);
        }

        .muted { color: var(--muted); }

        .alert {
            padding: 12px 14px;
            border-radius: 14px;
            margin-bottom: 16px;
            border: 1px solid var(--line);
        }

        .alert.success {
            background: rgba(22, 163, 74, 0.10);
            color: #14532d;
        }

        .alert.error {
            background: rgba(239, 68, 68, 0.10);
            color: #7f1d1d;
        }

        .field label {
            display: block;
            margin-bottom: 6px;
            color: #1e293b;
            font-size: 13px;
            font-weight: 700;
        }

        .field input,
        .field textarea {
            width: 100%;
            border-radius: 14px;
            border: 1px solid var(--line);
            padding: 12px 14px;
            background: linear-gradient(180deg, #ffffff, #f8fbff);
            color: var(--text);
            outline: none;
            transition: border-color .16s ease, box-shadow .16s ease;
        }

        .field input:focus,
        .field textarea:focus {
            border-color: rgba(37, 99, 235, 0.42);
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
        }

        .field textarea {
            min-height: 120px;
            resize: vertical;
        }

        .actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        .page-title {
            margin: 6px 0 0;
            letter-spacing: -0.03em;
        }

        .page-kicker {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .12em;
            color: var(--blue);
            font-weight: 800;
        }

        .surface-soft {
            background: linear-gradient(180deg, #f8fbff, #eef5ff);
            border: 1px solid var(--line);
            border-radius: 22px;
        }

        @media (max-width: 900px) {
            .grid.cols-2,
            .grid.cols-4 {
                grid-template-columns: 1fr;
            }

            .nav {
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="nav">
            <div>
                <div class="page-kicker">Mercado Solidário</div>
                <h1 class="page-title">{{ $title ?? 'Produtos do Fornecedor' }}</h1>
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
