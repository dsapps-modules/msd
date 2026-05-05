---
name: kilocao-ui-coherence
description: Preservar coerencia visual, UX, navegacao e copy entre telas novas ou alteradas no Kilocao. Use quando a tarefa envolver layout, componentes, formularios, estados de tela, navegacao, mensagens ao usuario, responsividade, theming ou padronizacao entre o customer app Flutter e o painel admin.
---

# Kilocao UI Coherence

1. Ler `references/ui-guardrails.md` antes de propor UI nova.

2. Manter consistencia antes de novidade:
   - reutilizar padroes existentes de espacamento, cards, inputs, filtros e feedback
   - variar apenas quando houver ganho funcional claro

3. Toda tela nova precisa declarar:
   - objetivo do usuario
   - acao primaria
   - estados de erro
   - estados vazios
   - comportamento mobile e desktop

4. Em Flutter:
   - respeitar a estrutura de rotas existente
   - evitar dependencias invisiveis de `state.extra` em telas que deveriam abrir por URL
   - usar componentes comuns antes de criar widgets duplicados

5. Em admin:
   - manter linguagem de tabela, filtros, formularios e acoes em lote coerente
   - priorizar clareza operacional sobre ornamento visual

6. Sempre revisar copy:
   - labels curtos
   - mensagens de erro acionaveis
   - sucesso sem ambiguidade

7. Se a feature mudar um fluxo, revisar o fluxo vizinho para evitar quebra de coerencia.
