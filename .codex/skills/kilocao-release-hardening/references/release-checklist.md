# Release Checklist

## Security

- `APP_DEBUG=false`
- CORS sem wildcard em producao
- HMAC/assinaturas sem fallback inseguro
- secrets fora do Flutter e do painel cliente
- resources sem tokens expostos

## Payments

- webhook Stripe acessivel server-to-server
- sucesso/cancel URLs corretas por ambiente
- retries nao duplicam cobranca nem marcacao de pedido pago

## Deployability

- backend instala dependencias e sobe
- admin possui scaffold completo e build reproduzivel
- frontend possui Flutter SDK e estrategia de build por ambiente

## Regression

- testes unitarios/backend executados
- manifesto de rotas atualizado
- E2E smoke das rotas deep-linkable executado

## Manual Checks

- login/logout
- navegacao inicial
- busca/listagem de produtos
- checkout
- confirmacao de pagamento
- consulta de pedido
