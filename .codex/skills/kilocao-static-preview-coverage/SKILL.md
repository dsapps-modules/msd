---
name: kilocao-static-preview-coverage
description: Manter todas as rotas e superficies do storefront visualizaveis em modo estatico, com preview URL-addressable, guards para integracoes opcionais e cobertura E2E no Kilocao.
---

# Kilocao Static Preview Coverage

1. Comecar pela cobertura de rotas:
   - revisar `frontend/e2e/route-manifest.mjs`
   - garantir que toda rota nova apareca no manifest
   - marcar rotas que exigem contexto ou params

2. Se a tela depender de `state.extra`, contexto autenticado ou dados remotos:
   - adicionar fallback por query string quando fizer sentido
   - fornecer defaults de preview seguros
   - evitar bloquear renderizacao por falta de backend real

3. Preservar visualizacao estavel no web:
   - blindar SDKs opcionais quando chaves estiverem placeholder
   - evitar inicializacao eager de integracoes externas
   - preferir fail-closed e UI estatica a crash em bootstrap

4. Sempre atualizar ou criar:
   - `frontend/e2e/tests/public-routes.spec.mjs`
   - `frontend/e2e/tests/preview-routes.spec.mjs`
   - `frontend/e2e/tests/storefront-runtime.spec.mjs`
   - `frontend/e2e/php-router.php` se surgir nova necessidade de deep link

5. Para cada tela nova, decidir explicitamente:
   - deep link publico
   - preview com query string
   - dependencia de autenticacao
   - dependencia de dados reais

6. Antes de concluir:
   - rodar `flutter build web`
   - rodar a suite Playwright do `frontend/e2e`
   - registrar quais erros foram corrigidos e quais ruidos conhecidos ficaram filtrados

7. Nunca mascarar regressao funcional:
   - filtros de teste so podem ignorar ruido conhecido do runtime Flutter web ou SDK terceiro
   - respostas suspeitas, telas em branco e rotas inacessiveis continuam sendo falha
