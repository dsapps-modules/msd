<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro em Análise</title>
    <style>
        :root {
            --bg: #eef3fb;
            --panel: #ffffff;
            --text: #0f172a;
            --muted: #64748b;
            --blue: #1d4ed8;
            --blue-deep: #0b1d45;
            --border: #dbe4f0;
            --shadow: 0 24px 80px rgba(15, 23, 42, 0.12);
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            min-height: 100vh;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background:
                radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 26%),
                radial-gradient(circle at top right, rgba(56, 189, 248, 0.08), transparent 20%),
                linear-gradient(180deg, #f7faff 0%, var(--bg) 100%);
            color: var(--text);
            display: grid;
            place-items: center;
            padding: 24px;
        }

        .card {
            width: min(900px, 100%);
            border-radius: 30px;
            overflow: hidden;
            background: var(--panel);
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
        }

        .hero {
            padding: 42px;
            color: #fff;
            background: linear-gradient(135deg, var(--blue-deep) 0%, #123a7a 52%, var(--blue) 100%);
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.15);
            font-size: 13px;
            font-weight: 700;
        }

        h1 {
            margin: 20px 0 14px;
            font-size: clamp(2rem, 4vw, 3.2rem);
            line-height: 0.98;
            letter-spacing: -0.03em;
        }

        p {
            margin: 0;
            max-width: 58ch;
            color: rgba(255,255,255,0.84);
            line-height: 1.7;
            font-size: 16px;
        }

        .body {
            padding: 32px 42px 42px;
            display: grid;
            gap: 18px;
        }

        .panel {
            border-radius: 22px;
            border: 1px solid var(--border);
            background: linear-gradient(180deg, #ffffff, #f7fbff);
            padding: 22px;
            display: grid;
            gap: 14px;
        }

        .status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            width: fit-content;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(29, 78, 216, 0.10);
            color: var(--blue);
            font-size: 12px;
            font-weight: 800;
            letter-spacing: .06em;
            text-transform: uppercase;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
        }

        .info {
            padding: 16px;
            border-radius: 18px;
            border: 1px solid var(--border);
            background: #fff;
        }

        .label {
            display: block;
            margin-bottom: 6px;
            color: var(--muted);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .08em;
            font-weight: 800;
        }

        .value {
            font-size: 16px;
            font-weight: 800;
            line-height: 1.45;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .btn {
            min-height: 48px;
            border-radius: 14px;
            padding: 0 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-weight: 800;
            transition: transform .15s ease;
        }

        .btn:hover { transform: translateY(-1px); }

        .btn-primary {
            background: linear-gradient(135deg, var(--blue) 0%, #38bdf8 100%);
            color: #fff;
        }

        .btn-secondary {
            background: #eff6ff;
            color: var(--blue);
        }

        @media (max-width: 720px) {
            .hero,
            .body {
                padding-left: 22px;
                padding-right: 22px;
            }

            .grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
<main class="card">
    <section class="hero">
        <div class="badge">Cadastro recebido</div>
        <h1>Seu cadastro está sendo analisado.</h1>
        <p>
            Recebemos as informações do fornecedor e elas foram encaminhadas para análise da equipe administrativa.
            Assim que o cadastro for aprovado, o acesso será liberado.
        </p>
    </section>

    <section class="body">
        <div class="panel">
            <span class="status">Aguardando análise</span>

            <div class="grid">
                <div class="info">
                    <span class="label">Fornecedor</span>
                    <div class="value">{{ $supplierName ?: 'Cadastro enviado com sucesso' }}</div>
                </div>
                <div class="info">
                    <span class="label">E-mail</span>
                    <div class="value">{{ $supplierEmail ?: 'Dados salvos no sistema' }}</div>
                </div>
                <div class="info">
                    <span class="label">Próximo passo</span>
                    <div class="value">Aguardar aprovação manual</div>
                </div>
            </div>

            <div class="actions">
                <a class="btn btn-primary" href="{{ route('fornecedor.login.form') }}">Voltar para o login</a>
                <a class="btn btn-secondary" href="{{ route('fornecedor.cadastro.create') }}">Editar cadastro</a>
            </div>
        </div>
    </section>
</main>
</body>
</html>
