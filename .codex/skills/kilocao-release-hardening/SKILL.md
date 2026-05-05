---
name: kilocao-release-hardening
description: Revisar readiness de release no Kilocao com foco em seguranca, configuracao, pagamentos, webhooks, observabilidade e cobertura de regressao. Use antes de publicar novas features, subir ambiente de staging/producao, abrir release candidate ou concluir uma customizacao de alto risco.
---

# Kilocao Release Hardening

1. Ler `references/release-checklist.md`.

2. Verificar configuracao:
   - segredos fora do cliente
   - dominios corretos em CORS
   - debug desligado
   - URLs e callbacks alinhados por ambiente

3. Verificar pagamentos:
   - webhooks publicos e assinados
   - nada de chave secreta no app cliente
   - fluxo de pedido e pagamento idempotente

4. Verificar exposicao de dados:
   - resources sem tokens ou IDs sensiveis
   - logs sem credenciais
   - cookies e tokens tratados com o maximo de protecao viavel

5. Verificar operacao:
   - filas
   - emails
   - notificacoes
   - erros observaveis

6. Verificar testes:
   - backend regressivo
   - smoke/E2E das rotas navegaveis
   - cobertura dos fluxos de compra, autenticacao e perfil

7. Encerrar com:
   - riscos remanescentes
   - blockers de release
   - passos manuais obrigatorios
