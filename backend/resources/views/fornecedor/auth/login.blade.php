<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login do Fornecedor</title>
    <style>
        :root {
            --bg: #f4f7fb;
            --card: #ffffff;
            --text: #0f172a;
            --muted: #64748b;
            --primary: #0f3d8c;
            --primary-2: #1d4ed8;
            --border: #d9e2ef;
            --danger: #dc2626;
            --shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background:
                radial-gradient(circle at top left, rgba(29, 78, 216, 0.08), transparent 30%),
                radial-gradient(circle at bottom right, rgba(15, 61, 140, 0.06), transparent 24%),
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
            width: min(1080px, 100%);
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            border: 1px solid var(--border);
            border-radius: 28px;
            overflow: hidden;
            background: var(--card);
            box-shadow: var(--shadow);
        }

        .hero {
            padding: 44px;
            background: linear-gradient(135deg, #0b1d45 0%, #123a7a 52%, #1d4ed8 100%);
            color: #fff;
            position: relative;
        }

        .hero::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 26%),
                radial-gradient(circle at 85% 20%, rgba(255,255,255,0.15), transparent 22%),
                radial-gradient(circle at 65% 80%, rgba(255,255,255,0.12), transparent 18%);
            pointer-events: none;
        }

        .hero > * { position: relative; z-index: 1; }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.13);
            border: 1px solid rgba(255,255,255,0.15);
            font-size: 13px;
            font-weight: 700;
        }

        .hero h1 {
            margin: 22px 0 14px;
            font-size: clamp(2rem, 4vw, 3.6rem);
            line-height: 0.98;
            letter-spacing: -0.03em;
        }

        .hero p {
            margin: 0;
            max-width: 44ch;
            color: rgba(255,255,255,0.84);
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
            color: rgba(255,255,255,0.92);
            font-size: 14px;
        }

        .hero-list span {
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: #93c5fd;
            box-shadow: 0 0 0 4px rgba(147,197,253,0.18);
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

        .field {
            margin-top: 18px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-size: 13px;
            font-weight: 700;
            color: var(--text);
        }

        input {
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
            border-color: rgba(29, 78, 216, 0.55);
            box-shadow: 0 0 0 4px rgba(29, 78, 216, 0.12);
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

        .btn:hover {
            transform: translateY(-1px);
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
            color: #fff;
            box-shadow: 0 16px 30px rgba(29, 78, 216, 0.24);
        }

        .btn-secondary {
            background: #eff6ff;
            color: var(--primary);
        }

        .footnote {
            margin-top: 18px;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.5;
        }

        .footnote a {
            color: var(--primary-2);
            font-weight: 700;
            text-decoration: none;
        }

        @media (max-width: 960px) {
            .card {
                grid-template-columns: 1fr;
            }

            .hero,
            .form-panel {
                padding: 28px;
            }
        }
    </style>
</head>
<body>
<main class="shell">
    <section class="card">
        <aside class="hero">
            <div class="badge">Área do fornecedor</div>
            <h1>Login para importar produtos em massa</h1>
            <p>
                Acesse a área protegida para cadastrar produtos por planilha Excel,
                validar imagens e importar tudo com vínculo ao seu fornecedor.
            </p>
            <ul class="hero-list">
                <li><span></span>Cadastro unitário e importação em massa no mesmo fluxo.</li>
                <li><span></span>Validação de planilha, imagens e duplicidade por código.</li>
                <li><span></span>Permissão exclusiva para fornecedor_admin e fornecedor_colaborador.</li>
            </ul>
        </aside>

        <section class="form-panel">
            <h2 class="title">Entrar como fornecedor</h2>
            <p class="subtitle">Use suas credenciais de fornecedor para acessar a área de produtos.</p>

            @if ($errors->any())
                <div class="alert">
                    {{ $errors->first() }}
                </div>
            @endif

            <form method="POST" action="{{ route('fornecedor.login.submit') }}">
                @csrf
                <div class="field">
                    <label for="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value="{{ old('email') }}"
                        autocomplete="email"
                        placeholder="admin.fornecedor@teste.com"
                        required
                    >
                </div>

                <div class="field">
                    <label for="password">Senha</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        autocomplete="current-password"
                        placeholder="••••••••"
                        required
                    >
                </div>

                <div class="row">
                    <label class="check" for="remember">
                        <input id="remember" type="checkbox" name="remember" value="1">
                        Lembrar acesso neste dispositivo
                    </label>
                </div>

                <div class="actions">
                    <button class="btn btn-primary" type="submit">Entrar</button>
                    <a class="btn btn-secondary" href="{{ $dashboardUrl }}">Ir para dashboard</a>
                    <a class="btn btn-secondary" href="{{ $registrationUrl }}">Quero me cadastrar</a>
                </div>

                <p class="footnote">
                    Se ainda não tiver acesso, fale com o administrador do sistema.
                    Após entrar, você será redirecionado para a importação de produtos.
                </p>
            </form>
        </section>
    </section>
</main>
</body>
</html>
