<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login do Divulgador</title>
    <style>
        :root {
            --bg: #f5f7fb;
            --card: #ffffff;
            --text: #0f172a;
            --muted: #64748b;
            --primary: #6d28d9;
            --primary-2: #8b5cf6;
            --border: #d9e2ef;
            --danger: #dc2626;
            --shadow: 0 22px 60px rgba(15, 23, 42, 0.14);
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background:
                radial-gradient(circle at top left, rgba(139, 92, 246, 0.12), transparent 28%),
                radial-gradient(circle at bottom right, rgba(109, 40, 217, 0.08), transparent 22%),
                var(--bg);
            color: var(--text);
        }

        .shell {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 32px 20px;
        }

        .card {
            width: min(1024px, 100%);
            display: grid;
            grid-template-columns: 1fr 1fr;
            border: 1px solid var(--border);
            border-radius: 28px;
            overflow: hidden;
            background: var(--card);
            box-shadow: var(--shadow);
        }

        .hero {
            padding: 44px;
            color: #fff;
            background: linear-gradient(135deg, #24124f 0%, #5b21b6 50%, #8b5cf6 100%);
            position: relative;
        }

        .hero::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
                radial-gradient(circle at 15% 20%, rgba(255,255,255,0.18), transparent 22%),
                radial-gradient(circle at 82% 18%, rgba(255,255,255,0.16), transparent 18%),
                radial-gradient(circle at 75% 82%, rgba(255,255,255,0.1), transparent 18%);
            pointer-events: none;
        }

        .hero > * { position: relative; z-index: 1; }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.14);
            border: 1px solid rgba(255,255,255,0.16);
            font-size: 13px;
            font-weight: 700;
        }

        .hero h1 {
            margin: 22px 0 14px;
            font-size: clamp(2rem, 4vw, 3.4rem);
            line-height: 0.98;
            letter-spacing: -0.03em;
        }

        .hero p {
            margin: 0;
            max-width: 40ch;
            color: rgba(255,255,255,0.85);
            font-size: 15px;
            line-height: 1.6;
        }

        .hero-list {
            margin: 28px 0 0;
            padding: 0;
            list-style: none;
            display: grid;
            gap: 10px;
        }

        .hero-list li {
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgba(255,255,255,0.94);
            font-size: 14px;
        }

        .hero-list span {
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: #ddd6fe;
            box-shadow: 0 0 0 4px rgba(221,214,254,0.16);
            flex: none;
        }

        .form-panel {
            padding: 44px;
        }

        .title {
            margin: 0;
            font-size: 28px;
            letter-spacing: -0.03em;
        }

        .subtitle {
            margin: 8px 0 0;
            color: var(--muted);
            line-height: 1.5;
        }

        .alert {
            margin-top: 22px;
            padding: 14px 16px;
            border-radius: 14px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: var(--danger);
            font-size: 14px;
        }

        .field { margin-top: 18px; }

        label {
            display: block;
            margin-bottom: 8px;
            font-size: 13px;
            font-weight: 700;
            color: var(--text);
        }

        input[type="email"],
        input[type="password"] {
            width: 100%;
            height: 52px;
            border-radius: 14px;
            border: 1px solid var(--border);
            padding: 0 16px;
            font-size: 15px;
            outline: none;
            background: #fff;
            color: var(--text);
            transition: border-color .18s ease, box-shadow .18s ease;
        }

        input:focus {
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.12);
        }

        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-top: 16px;
            flex-wrap: wrap;
        }

        .check {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--muted);
            font-size: 14px;
        }

        .check input {
            width: 18px;
            height: 18px;
            margin: 0;
            box-shadow: none;
        }

        .actions {
            display: grid;
            gap: 10px;
            margin-top: 22px;
        }

        .btn {
            height: 52px;
            border: 0;
            border-radius: 14px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 700;
            transition: transform .16s ease, box-shadow .16s ease, opacity .16s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn:hover { transform: translateY(-1px); }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
            color: #fff;
            box-shadow: 0 16px 30px rgba(109, 40, 217, 0.24);
        }

        .btn-secondary {
            background: #f5f3ff;
            color: var(--primary);
        }

        .footnote {
            margin-top: 18px;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.5;
        }

        .footnote a {
            color: var(--primary);
            font-weight: 700;
            text-decoration: none;
        }

        @media (max-width: 960px) {
            .card { grid-template-columns: 1fr; }
            .hero,
            .form-panel { padding: 28px; }
        }
    </style>
</head>
<body>
<main class="shell">
    <section class="card">
        <div class="hero">
            <div class="badge">Acesso do divulgador</div>
            <h1>Entre no dashboard do divulgador.</h1>
            <p>Use o endereço local em `8000` para acessar o painel e evitar depender do preview em `3000`.</p>

            <ul class="hero-list">
                <li><span></span>Login centralizado no backend</li>
                <li><span></span>Fluxo compatível com os dados do seed</li>
                <li><span></span>Rota amigável para deep link</li>
            </ul>
        </div>

        <div class="form-panel">
            <h2 class="title">Entrar como divulgador</h2>
            <p class="subtitle">Use uma conta divulgador aprovada do seed local. Exemplo: admin.ministerio.nova@teste.com / password.</p>

            @if ($errors->any())
                <div class="alert">
                    {{ $errors->first() }}
                </div>
            @endif

            <form method="POST" action="{{ route('divulgador.login.submit') }}">
                @csrf
                <div class="field">
                    <label for="email">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value="{{ old('email') }}"
                        placeholder="admin.ministerio.nova@teste.com"
                        autocomplete="email"
                        required
                    >
                </div>

                <div class="field">
                    <label for="password">Senha</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Digite a senha"
                        autocomplete="current-password"
                        required
                    >
                </div>

                <div class="row">
                    <label class="check" for="remember">
                        <input id="remember" name="remember" type="checkbox" value="1">
                        Lembrar acesso
                    </label>
                </div>

                <div class="actions">
                    <button type="submit" class="btn btn-primary">Entrar no dashboard</button>
                    <a class="btn btn-secondary" href="{{ $dashboardUrl }}">Ir para o dashboard</a>
                    <a class="btn btn-secondary" href="{{ route('divulgador.cadastro.create') }}">Quero me cadastrar</a>
                </div>
            </form>

            <p class="footnote">
                Link local: <a href="{{ url('/divulgador/login/') }}">{{ url('/divulgador/login/') }}</a>
            </p>
        </div>
    </section>
</main>
</body>
</html>
