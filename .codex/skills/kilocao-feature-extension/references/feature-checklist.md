# Feature Checklist

## Backend

- Existe migration nova ou ajuste de schema?
- Existe request class para validacao?
- Existe autorizacao e controle de permissao?
- O resource exposto evita campos sensiveis?
- A regra ficou em service/repository em vez de controller?
- Existe impacto em filas, notificacoes ou webhooks?

## Flutter

- A rota pode ser deep-linkable?
- Existem estados de loading, vazio, erro e sucesso?
- A feature depende de segredo no cliente?
- A configuracao usa `String.fromEnvironment` ou backend?
- O fluxo funciona em mobile e web quando aplicavel?

## Admin

- A feature precisa de operacao humana?
- Existe permissao adequada?
- O painel precisa criar, editar, listar ou aprovar?
- Ha impacto em relatórios, filtros ou exportacao?

## Tests

- Existe teste de regressao backend?
- Existe smoke/E2E para rota navegavel?
- Existem fixtures ou dados de teste previsiveis?
