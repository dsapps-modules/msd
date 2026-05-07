# Kilocao Ecommerce Readiness Audit

## Objetivo

Transformar a base atual em um ponto de partida seguro para publicar um e-commerce customizavel, mantendo caminho claro para extensao por cliente e demonstracao visual completa do storefront.

## Achados principais

1. Seguranca e configuracao
   - Havia segredos Stripe hardcoded no admin.
   - O backend expunha `com_google_recaptcha_v3_secret_key` em payload publico.
   - Integracoes opcionais do admin quebravam build quando variaveis nao existiam.
   - O `frontend/web/index.html` carregava scripts Google com placeholders.

2. Robustez de build e deploy
   - O postbuild do admin quebrava em Windows por causa de symlink copy.
   - O storefront Flutter dependia de integracoes externas mesmo em modo de preview.

3. Extensibilidade
   - Varias rotas Flutter dependiam de `state.extra`, o que impedia deep links, previews e E2E previsiveis.
   - Faltava um catalogo de preview para navegar por funcionalidades estaticas.

4. Qualidade e testes
   - Nao havia cobertura E2E suficiente para todas as paginas publicas e de preview.
   - O runtime web sofre ruido conhecido do Flutter/CanvasKit e SDKs terceiros; os testes agora isolam esse ruido sem aceitar quebra funcional.

## Correcoes executadas

1. Admin
   - Removidos segredos Stripe hardcoded.
   - Criados guards server-side para Stripe e outras integracoes opcionais.
   - Corrigido `admin/scripts/postbuild.js` para funcionar em Windows.
   - `npm run build` agora fecha com sucesso.

2. Backend
   - Removida a exposicao da secret de reCAPTCHA no endpoint publico.
   - Adicionado teste unitario garantindo que o segredo nao volte a ser serializado.

3. Frontend Flutter
   - Criado `previewCatalog` para visualizacao centralizada das funcionalidades.
   - Adicionados fallbacks por query string/defaults para rotas que dependiam de contexto.
   - Ajustado bootstrap para modo de preview web.
   - Desligadas inicializacoes web nao configuradas para Stripe/social login.
   - Blindado `index.html` para integracoes Google opcionais.

4. E2E
   - Criado router PHP para deep links sobre `build/web`.
   - Atualizado manifest de rotas.
   - Criados/ajustados testes:
     - `public-routes.spec.mjs`
     - `preview-routes.spec.mjs`
     - `storefront-runtime.spec.mjs`
     - `route-manifest.spec.mjs`
   - Resultado atual: `51 passed`.

## Riscos remanescentes

1. Flutter web
   - Ainda existem ruidos conhecidos do renderer CanvasKit e de SDKs web terceirizados.
   - Os testes ignoram apenas erros opacos conhecidos; tela em branco, resposta suspeita e rota inacessivel continuam falhando.

2. Integracoes reais
   - Google, Stripe, Facebook, Firebase, mapas, chat e pagamentos ainda precisam configuracao produtiva real.
   - O preview estatico nao substitui homologacao com credenciais verdadeiras.

3. Codigo legado
   - `flutter analyze` ainda reporta warnings e deprecated APIs que devem entrar no backlog tecnico.

## Plano de evolucao para publicar

1. Fase 1: base segura
   - fechar configuracao por ambiente
   - revisar CORS, webhooks, rate limiting e logs
   - remover placeholders restantes do frontend e admin

2. Fase 2: operacao minima de loja
   - validar catalogo, carrinho, checkout, enderecos, pedidos e notificacoes com dados reais
   - homologar pagamentos necessarios para o cliente
   - revisar papeis e permissoes do admin

3. Fase 3: customizacao por cliente
   - transformar regras recorrentes em configuracao ou feature flags
   - manter contratos backend-first
   - exigir preview URL-addressable para novas telas sempre que possivel

4. Fase 4: readiness de publicacao
   - staging com credenciais reais
   - smoke E2E de regressao
   - checklist de release hardening
   - observabilidade e plano de rollback

## Regras para extensao daqui em diante

1. Toda rota nova deve entrar no manifest e decidir se precisa preview publico.
2. Toda integracao opcional deve falhar de forma segura quando nao configurada.
3. Toda customizacao por cliente deve buscar configuracao e extensao antes de fork.
4. Toda feature com impacto cross-app deve considerar backend, app, admin, testes e operacao.
