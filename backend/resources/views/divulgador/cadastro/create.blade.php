<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro do Divulgador</title>
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
            width: min(1180px, 100%);
            display: grid;
            grid-template-columns: 0.92fr 1.08fr;
            border: 1px solid var(--border);
            border-radius: 28px;
            overflow: hidden;
            background: var(--card);
            box-shadow: var(--shadow);
        }

        .hero {
            padding: 44px;
            color: #fff;
            background: linear-gradient(135deg, #24124f 0%, #5b21b6 52%, #8b5cf6 100%);
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
            background: rgba(255,255,255,0.14);
            border: 1px solid rgba(255,255,255,0.16);
            font-size: 13px;
            font-weight: 700;
        }

        .hero h1 {
            margin: 22px 0 14px;
            font-size: clamp(2rem, 4vw, 3.45rem);
            line-height: 0.98;
            letter-spacing: -0.03em;
        }

        .hero p {
            margin: 0;
            max-width: 48ch;
            color: rgba(255,255,255,0.86);
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

        .grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            margin-top: 18px;
        }

        .field {
            display: grid;
            gap: 8px;
        }

        .field.full {
            grid-column: 1 / -1;
        }

        label {
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
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.12);
        }

        .hint {
            margin-top: 4px;
            color: var(--muted);
            font-size: 12px;
            line-height: 1.45;
        }

        .actions {
            display: grid;
            gap: 10px;
            margin-top: 24px;
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

        @media (max-width: 1040px) {
            .card {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 720px) {
            .hero,
            .form-panel {
                padding: 28px;
            }

            .grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
<main class="shell">
    <section class="card">
        <aside class="hero">
            <div class="badge">Cadastro de divulgador</div>
            <h1>Solicite seu cadastro para análise</h1>
            <p>
                Preencha seus dados pessoais e de endereço para enviar seu cadastro.
                Após o envio, ele ficará com status pendente até a análise da equipe.
            </p>
            <ul class="hero-list">
                <li><span></span>Dados de contato e identificação do divulgador.</li>
                <li><span></span>Endereço completo compatível com a base do seeder.</li>
                <li><span></span>Código de conta gerado automaticamente após o envio.</li>
            </ul>
        </aside>

        <section class="form-panel">
            <h2 class="title">Cadastro do divulgador</h2>
            <p class="subtitle">Preencha os campos abaixo para enviar seu cadastro para análise.</p>

            @if ($errors->any())
                <div class="alert">
                    {{ $errors->first() }}
                </div>
            @endif

            <form method="POST" action="{{ route('divulgador.cadastro.store') }}">
                @csrf

                <div class="grid">
                    <div class="field">
                        <label for="first_name">Nome</label>
                        <input id="first_name" name="first_name" value="{{ old('first_name') }}" required placeholder="Maria">
                    </div>

                    <div class="field">
                        <label for="last_name">Sobrenome</label>
                        <input id="last_name" name="last_name" value="{{ old('last_name') }}" required placeholder="Silva">
                    </div>

                    <div class="field">
                        <label for="birth_day">Data de nascimento</label>
                        <input id="birth_day" type="date" name="birth_day" value="{{ old('birth_day') }}" required>
                    </div>

                    <div class="field">
                        <label for="phone">Telefone</label>
                        <input id="phone" name="phone" value="{{ old('phone') }}" required placeholder="(11) 98888-0001">
                    </div>

                    <div class="field">
                        <label for="cpf">CPF</label>
                        <input id="cpf" name="cpf" value="{{ old('cpf') }}" required placeholder="111.444.777-35">
                    </div>

                    <div class="field">
                        <label for="cnpj">CNPJ <span class="hint">(opcional)</span></label>
                        <input id="cnpj" name="cnpj" value="{{ old('cnpj') }}" placeholder="04.252.011/0001-10">
                    </div>

                    <div class="field full">
                        <label for="email">E-mail</label>
                        <input id="email" type="email" name="email" value="{{ old('email') }}" required placeholder="contato@divulgador.com">
                    </div>

                    <div class="field">
                        <label for="password">Senha</label>
                        <input id="password" type="password" name="password" required placeholder="Mínimo de 8 caracteres">
                    </div>

                    <div class="field">
                        <label for="password_confirmation">Confirmar senha</label>
                        <input id="password_confirmation" type="password" name="password_confirmation" required placeholder="Repita a senha">
                    </div>

                    <div class="field">
                        <label for="cep">CEP</label>
                        <input id="cep" name="cep" value="{{ old('cep') }}" required placeholder="01234-100">
                    </div>

                    <div class="field">
                        <label for="street_type">Tipo de logradouro</label>
                        <input id="street_type" name="street_type" value="{{ old('street_type') }}" required placeholder="Rua, Av., Estrada">
                    </div>

                    <div class="field full">
                        <label for="street_name">Logradouro</label>
                        <input id="street_name" name="street_name" value="{{ old('street_name') }}" required placeholder="das Flores">
                    </div>

                    <div class="field">
                        <label for="street_number">Número</label>
                        <input id="street_number" name="street_number" value="{{ old('street_number') }}" required placeholder="120">
                    </div>

                    <div class="field">
                        <label for="street_complement">Complemento</label>
                        <input id="street_complement" name="street_complement" value="{{ old('street_complement') }}" placeholder="Casa 2">
                    </div>

                    <div class="field">
                        <label for="street_neighborhood">Bairro</label>
                        <input id="street_neighborhood" name="street_neighborhood" value="{{ old('street_neighborhood') }}" required placeholder="Centro">
                    </div>

                    <div class="field">
                        <label for="street_city">Cidade</label>
                        <input id="street_city" name="street_city" value="{{ old('street_city') }}" required placeholder="São Paulo">
                    </div>

                    <div class="field full">
                        <label for="street_state">Estado</label>
                        <input id="street_state" name="street_state" value="{{ old('street_state') }}" required maxlength="2" placeholder="SP">
                    </div>
                </div>

                <div class="actions">
                    <button class="btn btn-primary" type="submit">Enviar Cadastro para Análise</button>
                    <a class="btn btn-secondary" href="{{ route('divulgador.login.form') }}">Já tenho acesso</a>
                </div>

                <p class="footnote">
                    O cadastro será salvo como pendente e, após a análise, você poderá acessar o dashboard normalmente.
                </p>
            </form>
        </section>
    </section>
</main>
</body>
</html>
