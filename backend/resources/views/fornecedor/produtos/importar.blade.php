<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Importar Produtos</title>
    <style>
        :root {
            --bg: #0b1220;
            --panel: rgba(15, 23, 42, 0.88);
            --panel-2: rgba(30, 41, 59, 0.88);
            --border: rgba(148, 163, 184, 0.18);
            --text: #e2e8f0;
            --muted: #94a3b8;
            --accent: #38bdf8;
            --accent-2: #22c55e;
            --danger: #fb7185;
            --warning: #f59e0b;
        }

        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background:
                radial-gradient(circle at top left, rgba(56, 189, 248, 0.22), transparent 28%),
                radial-gradient(circle at right 20%, rgba(34, 197, 94, 0.12), transparent 22%),
                linear-gradient(180deg, #060b14 0%, #0b1220 100%);
            color: var(--text);
            min-height: 100vh;
        }

        .shell {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px 56px;
        }

        .hero {
            display: grid;
            gap: 16px;
            margin-bottom: 24px;
        }

        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            width: fit-content;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(56, 189, 248, 0.12);
            color: #7dd3fc;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: .08em;
            text-transform: uppercase;
        }

        h1 {
            margin: 0;
            font-size: clamp(28px, 4vw, 48px);
            line-height: 1.05;
            letter-spacing: -0.03em;
        }

        .lead {
            margin: 0;
            max-width: 820px;
            color: var(--muted);
            font-size: 16px;
            line-height: 1.65;
        }

        .grid {
            display: grid;
            gap: 20px;
        }

        .panel {
            background: linear-gradient(180deg, var(--panel), var(--panel-2));
            border: 1px solid var(--border);
            border-radius: 22px;
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
            overflow: hidden;
        }

        .panel-head {
            padding: 22px 24px 16px;
            border-bottom: 1px solid var(--border);
        }

        .panel-body {
            padding: 24px;
        }

        .section-title {
            margin: 0 0 8px;
            font-size: 18px;
            letter-spacing: -0.02em;
        }

        .section-desc {
            margin: 0;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.6;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 12px;
            margin-bottom: 20px;
        }

        .stat {
            padding: 16px;
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.72);
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

        .field-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
        }

        .field {
            display: grid;
            gap: 8px;
        }

        .field label {
            font-size: 13px;
            color: #cbd5e1;
            font-weight: 600;
        }

        .field input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 14px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            background: rgba(2, 6, 23, 0.75);
            color: var(--text);
            outline: none;
        }

        .field input::file-selector-button {
            border: 0;
            background: rgba(56, 189, 248, 0.16);
            color: #7dd3fc;
            padding: 8px 12px;
            border-radius: 10px;
            margin-right: 12px;
            cursor: pointer;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 20px;
        }

        .btn {
            appearance: none;
            border: 0;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 14px;
            padding: 12px 16px;
            font-weight: 700;
            font-size: 14px;
            transition: transform .15s ease, opacity .15s ease, background .15s ease;
        }

        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, #38bdf8, #0ea5e9); color: white; }
        .btn-success { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; }
        .btn-ghost { background: rgba(148, 163, 184, 0.12); color: var(--text); border: 1px solid var(--border); }

        .notice {
            padding: 14px 16px;
            border-radius: 16px;
            border: 1px solid var(--border);
            background: rgba(15, 23, 42, 0.6);
            color: var(--muted);
            line-height: 1.6;
        }

        .notice strong { color: var(--text); }
        .notice.error { border-color: rgba(251, 113, 133, 0.35); color: #fecdd3; }
        .notice.warning { border-color: rgba(245, 158, 11, 0.35); color: #fde68a; }
        .notice.success { border-color: rgba(34, 197, 94, 0.35); color: #bbf7d0; }

        .table-wrap {
            overflow-x: auto;
            border-radius: 18px;
            border: 1px solid var(--border);
            background: rgba(2, 6, 23, 0.45);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 980px;
        }

        th, td {
            padding: 14px 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            vertical-align: top;
            text-align: left;
            font-size: 13px;
        }

        th {
            position: sticky;
            top: 0;
            background: rgba(15, 23, 42, 0.95);
            z-index: 1;
            color: #cbd5e1;
            text-transform: uppercase;
            letter-spacing: .06em;
            font-size: 11px;
        }

        .status {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 7px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
        }

        .status.valid { background: rgba(34, 197, 94, 0.16); color: #86efac; }
        .status.error { background: rgba(251, 113, 133, 0.16); color: #fda4af; }

        ul.compact {
            margin: 0;
            padding-left: 18px;
            color: #cbd5e1;
        }

        .muted { color: var(--muted); }

        @media (max-width: 880px) {
            .stats,
            .field-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="shell">
        <div class="hero">
            <span class="eyebrow">Fornecedor · Importação em massa</span>
            <h1>Importar produtos por planilha Excel</h1>
            <p class="lead">
                Envie a planilha com os cabeçalhos obrigatórios, valide o arquivo e confirme a importação
                somente quando todas as linhas estiverem consistentes. As imagens podem vir por upload múltiplo ou ZIP.
            </p>
        </div>

        @if(!empty($message))
            <div class="notice {{ $ok ? 'success' : 'error' }}" style="margin-bottom: 18px;">
                <strong>{{ $message }}</strong>
            </div>
        @endif

        @if(!empty($missingColumns))
            <div class="notice error" style="margin-bottom: 18px;">
                <strong>Colunas ausentes:</strong>
                <div>{{ implode(', ', $missingColumns) }}</div>
                <div class="muted">Baixe o modelo correto antes de tentar novamente.</div>
            </div>
        @endif

        @if(!empty($summary) && !empty($summary['warnings']))
            <div class="notice warning" style="margin-bottom: 18px;">
                <strong>Alertas:</strong>
                <ul class="compact">
                    @foreach($summary['warnings'] as $warning)
                        <li>{{ $warning }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="grid">
            <div class="panel">
                <div class="panel-head">
                    <h2 class="section-title">Upload da planilha e imagens</h2>
                    <p class="section-desc">Use os nomes exatos das imagens na coluna IMAGENS. O primeiro arquivo vira a imagem principal.</p>
                </div>
                <div class="panel-body">
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-label">Cabeçalhos</span>
                            <span class="stat-value">10</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Linha de exemplo</span>
                            <span class="stat-value">1</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Tamanho sugerido</span>
                            <span class="stat-value">10MB</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Imagens</span>
                            <span class="stat-value">ZIP / múltiplos</span>
                        </div>
                    </div>

                    <form method="POST" action="{{ route('fornecedor.produtos.validar') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="field-grid">
                            <div class="field">
                                <label for="planilha">Planilha Excel</label>
                                <input id="planilha" name="planilha" type="file" accept=".xlsx,.xls,.csv" required>
                            </div>
                            <div class="field">
                                <label for="imagens_zip">ZIP de imagens</label>
                                <input id="imagens_zip" name="imagens_zip" type="file" accept=".zip">
                            </div>
                            <div class="field" style="grid-column: 1 / -1;">
                                <label for="imagens">Imagens individuais</label>
                                <input id="imagens" name="imagens[]" type="file" accept=".jpg,.jpeg,.png,.webp" multiple>
                            </div>
                        </div>

                        <div class="actions">
                            <a class="btn btn-ghost" href="{{ $downloadTemplateUrl }}">Baixar modelo de planilha</a>
                            <button class="btn btn-primary" type="submit">Validar planilha</button>
                        </div>
                    </form>
                </div>
            </div>

            @if(!empty($preview) && count($preview) > 0)
                <div class="panel">
                    <div class="panel-head">
                        <h2 class="section-title">Pré-visualização</h2>
                        <p class="section-desc">Todos os itens abaixo precisam estar válidos para liberar a importação.</p>
                    </div>
                    <div class="panel-body">
                        <div class="stats" style="margin-bottom: 18px;">
                            <div class="stat">
                                <span class="stat-label">Linhas</span>
                                <span class="stat-value">{{ $summary['total_rows'] ?? count($preview) }}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Válidas</span>
                                <span class="stat-value">{{ $summary['valid_rows'] ?? 0 }}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Com erro</span>
                                <span class="stat-value">{{ $summary['invalid_rows'] ?? 0 }}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Imagens vinculadas</span>
                                <span class="stat-value">{{ $summary['images_linked'] ?? 0 }}</span>
                            </div>
                        </div>

                        <div class="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Linha</th>
                                        <th>Código</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        <th>Estoque reservado</th>
                                        <th>Qtd. imagens</th>
                                        <th>Status</th>
                                        <th>Erros</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($preview as $item)
                                        <tr>
                                            <td>{{ $item['row_number'] ?? '-' }}</td>
                                            <td>{{ $item['codigo'] ?? '-' }}</td>
                                            <td>{{ $item['descricao'] ?? '-' }}</td>
                                            <td>{{ isset($item['valor_venda']) ? number_format((float) $item['valor_venda'], 2, ',', '.') : '-' }}</td>
                                            <td>{{ $item['estoque_reservado'] ?? '-' }}</td>
                                            <td>{{ $item['quantity_images'] ?? 0 }}</td>
                                            <td>
                                                <span class="status {{ $item['status'] ?? 'error' }}">{{ $item['status'] === 'valid' ? 'Válido' : 'Erro' }}</span>
                                            </td>
                                            <td>
                                                @if(!empty($item['errors']))
                                                    <ul class="compact">
                                                        @foreach($item['errors'] as $error)
                                                            <li>{{ $error }}</li>
                                                        @endforeach
                                                    </ul>
                                                @else
                                                    <span class="muted">Sem erros</span>
                                                @endif
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                        @if(!empty($previewToken) && ($summary['invalid_rows'] ?? 0) === 0)
                            <form method="POST" action="{{ route('fornecedor.produtos.confirmar') }}" style="margin-top: 18px;">
                                @csrf
                                <input type="hidden" name="preview_token" value="{{ $previewToken }}">
                                <div class="actions">
                                    <button class="btn btn-success" type="submit">Importar produtos</button>
                                </div>
                            </form>
                        @endif
                    </div>
                </div>
            @elseif(!empty($report))
                <div class="panel">
                    <div class="panel-head">
                        <h2 class="section-title">Relatório final</h2>
                        <p class="section-desc">Resumo da importação concluída.</p>
                    </div>
                    <div class="panel-body">
                        <div class="stats">
                            <div class="stat">
                                <span class="stat-label">Linhas lidas</span>
                                <span class="stat-value">{{ $report['summary']['total_rows'] ?? 0 }}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Importados</span>
                                <span class="stat-value">{{ $report['summary']['imported_products'] ?? 0 }}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Erros</span>
                                <span class="stat-value">{{ $report['summary']['products_with_error'] ?? 0 }}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-label">Imagens processadas</span>
                                <span class="stat-value">{{ $report['summary']['images_processed'] ?? 0 }}</span>
                            </div>
                        </div>

                        @if(!empty($report['products']))
                            <div class="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descrição</th>
                                            <th>Valor</th>
                                            <th>Estoque reservado</th>
                                            <th>Imagens vinculadas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($report['products'] as $product)
                                            <tr>
                                                <td>{{ $product['codigo'] }}</td>
                                                <td>{{ $product['descricao'] }}</td>
                                                <td>{{ number_format((float) $product['valor_venda'], 2, ',', '.') }}</td>
                                                <td>{{ $product['estoque_reservado'] }}</td>
                                                <td>{{ $product['imagens'] }}</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        @endif
                    </div>
                </div>
            @endif
        </div>
    </div>
</body>
</html>
