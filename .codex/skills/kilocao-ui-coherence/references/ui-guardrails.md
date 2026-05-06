# UI Guardrails

## Shared Rules

- Uma tela deve comunicar um objetivo principal.
- Formularios longos devem ser segmentados visualmente.
- Tabelas e listas precisam ter estados vazio, loading e erro.
- Acoes destrutivas pedem confirmacao clara.
- Navegacao deve indicar retorno obvio ao contexto anterior.

## Flutter

- Reutilizar widgets comuns antes de criar variantes.
- Nao esconder erros de rede atras de loaders infinitos.
- Garantir leitura em mobile pequeno e web largo.

## Admin

- Priorizar filtros, busca, status e bulk actions.
- Nao misturar configuracao global com operacao diaria na mesma tela sem separacao clara.
- Mostrar impacto de configuracoes sensiveis como pagamentos, email e integracoes.
