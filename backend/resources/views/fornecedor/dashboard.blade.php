<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard do Fornecedor</title>
    <style>
        :root {
            --bg: #f4f7fb;
            --card: #ffffff;
            --text: #0f172a;
            --muted: #64748b;
            --primary: #0f3d8c;
            --primary-2: #1d4ed8;
            --border: #d9e2ef;
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
            padding: 32px 20px;
        }

        .wrap {
            max-width: 1180px;
            margin: 0 auto;
        }

        .hero {
            display: grid;
            gap: 12px;
            margin-bottom: 22px;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            width: fit-content;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(29, 78, 216, 0.09);
            color: var(--primary);
            font-size: 12px;
            font-weight: 800;
            letter-spacing: .06em;
            text-transform: uppercase;
        }

        h1 {
            margin: 0;
            font-size: clamp(28px, 4vw, 48px);
            line-height: 1.02;
            letter-spacing: -0.04em;
        }

        .lead {
            margin: 0;
            color: var(--muted);
            max-width: 760px;
            line-height: 1.6;
        }

        .grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 18px;
        }

        .panel {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 24px;
            box-shadow: var(--shadow);
            overflow: hidden;
        }

        .panel-head {
            padding: 20px 22px 14px;
            border-bottom: 1px solid var(--border);
        }

        .panel-body {
            padding: 22px;
        }

        .title {
            margin: 0 0 8px;
            font-size: 18px;
            letter-spacing: -0.02em;
        }

        .desc {
            margin: 0;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.6;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
        }

        .stat {
            padding: 18px;
            border-radius: 18px;
            background: linear-gradient(180deg, #f8fbff, #edf4ff);
            border: 1px solid var(--border);
        }

        .stat-label {
            display: block;
            font-size: 12px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: .08em;
            margin-bottom: 10px;
        }

        .stat-value {
            font-size: 24px;
            font-weight: 800;
        }

        .actions {
            display: grid;
            gap: 12px;
        }

        .btn {
            height: 52px;
            border: 0;
            border-radius: 14px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 800;
            transition: transform .16s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .btn:hover { transform: translateY(-1px); }
        .btn-primary {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
            color: #fff;
        }
        .btn-secondary {
            background: #eff6ff;
            color: var(--primary);
        }

        .list {
            margin: 0;
            padding-left: 18px;
            color: var(--muted);
            line-height: 1.8;
        }

        @media (max-width: 960px) {
            .grid,
            .stats {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
<main class="shell">
    <div class="wrap">
        <section class="hero">
            <div class="badge">Fornecedor autenticado</div>
            <h1>Dashboard do fornecedor</h1>
            <p class="lead">
                Esta é a área inicial após o login do fornecedor. A partir daqui, você acessa
                importação de produtos, download do modelo e as próximas rotas operacionais do fornecedor.
            </p>
        </section>

        <section class="grid">
            <article class="panel">
                <div class="panel-head">
                    <h2 class="title">Ações rápidas</h2>
                    <p class="desc">Fluxo inicial pensado para levar você direto à operação.</p>
                </div>
                <div class="panel-body">
                    <div class="actions">
                        <a class="btn btn-primary" href="{{ route('fornecedor.produtos.importar') }}">Importar produtos por Excel</a>
                        <a class="btn btn-secondary" href="{{ route('fornecedor.produtos.modelo') }}">Baixar modelo de planilha</a>
                        <form method="POST" action="{{ route('fornecedor.logout') }}">
                            @csrf
                            <button class="btn btn-secondary" type="submit">Sair</button>
                        </form>
                    </div>
                </div>
            </article>

            <article class="panel">
                <div class="panel-head">
                    <h2 class="title">Resumo do acesso</h2>
                    <p class="desc">Indicadores iniciais do fornecedor logado.</p>
                </div>
                <div class="panel-body">
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-label">Usuário</span>
                            <div class="stat-value">{{ $user->full_name }}</div>
                        </div>
                        <div class="stat">
                            <span class="stat-label">E-mail</span>
                            <div class="stat-value" style="font-size: 16px; line-height: 1.3;">{{ $user->email }}</div>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Perfil</span>
                            <div class="stat-value" style="font-size: 16px; line-height: 1.3;">{{ $user->accountPrimaryRoleName() }}</div>
                        </div>
                    </div>

                    <ul class="list" style="margin-top: 18px;">
                        <li>Produtos importados ficam vinculados ao fornecedor logado.</li>
                        <li>O cadastro unitário continua disponível na área de produtos.</li>
                        <li>A importação exige planilha e imagens válidas.</li>
                    </ul>
                </div>
            </article>
        </section>
    </div>
</main>
</body>
</html>
