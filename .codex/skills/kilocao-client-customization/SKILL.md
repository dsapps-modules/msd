---
name: kilocao-client-customization
description: Planejar customizacoes por cliente no Kilocao preservando extensibilidade, coerencia operacional, contratos entre apps e caminho seguro para publicacao.
---

# Kilocao Client Customization

1. Definir a customizacao em camadas:
   - regra de negocio do cliente
   - impacto em dados e contratos
   - impacto no app Flutter
   - impacto no admin
   - impacto operacional e de suporte

2. Antes de editar, identificar se a demanda deve virar:
   - configuracao
   - feature flag
   - modulo reutilizavel
   - personalizacao hardcoded

3. Preferir extensao a bifurcacao:
   - adicionar pontos de configuracao antes de duplicar fluxo
   - centralizar regras em services/use cases/backend
   - evitar copy-paste de telas para cada cliente

4. Toda customizacao precisa explicitar:
   - campos novos
   - estados novos
   - permissoes novas
   - impacto em pagamento, entrega, notificacao ou suporte
   - necessidade de migracao, seed ou backfill

5. Em UX e navegacao:
   - reutilizar componentes e tokens existentes
   - manter naming, copy e hierarquia visual coerentes
   - cobrir estados vazio, loading, erro, bloqueio e sucesso

6. Em release:
   - validar segredos e integracoes fora do codigo
   - garantir degradacao segura quando configuracao nao existir
   - definir testes minimos de regressao por superficie afetada

7. Antes de concluir:
   - registrar decisoes de extensao
   - apontar proximos modulos candidatos a configuracao
   - atualizar a skill ou checklist local se surgir um novo padrao recorrente
