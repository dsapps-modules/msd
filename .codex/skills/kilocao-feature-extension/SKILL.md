---
name: kilocao-feature-extension
description: Planejar e implementar novas features na base Kilocao mantendo coerencia entre Laravel backend, Flutter customer app e painel admin. Use quando a tarefa envolver nova capacidade de negocio, mudanca de fluxo, novo modulo, novo endpoint, novas telas, alteracao de modelo de dados ou qualquer customizacao que precise impacto cross-app, contratos claros e testes.
---

# Kilocao Feature Extension

1. Confirmar o escopo da feature em quatro superficies:
   - regra de negocio
   - API/backend
   - customer app Flutter
   - admin/seller panel

2. Ler `references/feature-checklist.md` antes de editar.

3. Tratar o backend como fonte de verdade:
   - definir entidade, estados, validacoes e autorizacao
   - identificar requests, controllers, services, resources e migrations afetados
   - evitar espalhar regra de negocio em controllers

4. Tratar o frontend Flutter como consumidor de contrato:
   - adicionar ou ajustar URLs/configuracao
   - encapsular chamadas em repositories/services
   - preservar navegacao consistente e tratar estados vazio, loading, erro e sucesso
   - evitar telas novas dependentes de `state.extra` quando deep link for desejavel

5. Tratar o admin como superficie operacional:
   - mapear permissoes
   - criar telas para configuracao, consulta ou manutencao apenas quando houver necessidade operacional real
   - preferir modulos existentes a novos pontos soltos

6. Exigir impactos explicitos:
   - schema/migrations
   - seeds ou fixtures
   - endpoints
   - recursos serializados
   - UI states
   - testes

7. Antes de concluir, registrar:
   - o que foi alterado
   - o que ficou pendente
   - quais fluxos precisam E2E adicional
