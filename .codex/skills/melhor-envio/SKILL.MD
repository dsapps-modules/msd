# Skill Codex — Integração de Frete do MSD com Melhor Envio + Fornecedor Tipo A

## 1. Contexto do projeto

O projeto **MSD — Mercado Solidário Digital** será um marketplace solidário com três atores principais:

- **Fornecedor**: cadastra e gerencia produtos próprios.
- **Cliente**: compra produtos em uma experiência de e-commerce.
- **Divulgador/Campanha**: recebe a destinação solidária/comissão vinculada à compra.

A estratégia anterior com dropshipping foi descartada. A implementação deve considerar **somente fornecedores do Tipo A**, isto é:

> Fornecedores próprios cadastrados no MSD, responsáveis por manter produtos, estoque, dimensões, peso, endereço de origem e expedição física dos pedidos.

A logística será integrada ao **Melhor Envio**, usando o MSD como camada central de cotação, seleção de frete, criação de envio, geração de etiqueta e acompanhamento de rastreio.

---

## 2. Objetivo da implementação

Implementar o módulo de frete do MSD com as seguintes capacidades:

1. Permitir que o fornecedor cadastre os dados logísticos necessários dos produtos.
2. Permitir que o fornecedor cadastre seu endereço de origem/remetente.
3. Calcular frete no checkout do cliente usando a API do Melhor Envio.
4. Exibir opções de frete ao cliente antes da finalização do pedido.
5. Registrar a opção de frete escolhida no pedido.
6. Criar a estrutura para geração de etiqueta após confirmação do pedido.
7. Disponibilizar a etiqueta para o fornecedor imprimir.
8. Registrar código de rastreio e status logístico.
9. Atualizar o status do envio por webhook ou rotina de consulta.
10. Manter a arquitetura desacoplada para permitir futura troca de operador logístico.

---

## 3. Princípios obrigatórios

O Codex deve seguir estes princípios:

- Não implementar dropshipping.
- Não criar fluxo para fornecedor externo automatizado.
- Não misturar regra de frete com regra de comissão, campanha, pagamento ou split.
- Não alterar o que já foi feito no módulo de fornecedor, exceto quando necessário para incluir campos logísticos.
- Manter a estética já usada no projeto.
- Usar migrations, models, controllers/services e testes.
- Criar uma camada de serviço para o Melhor Envio, evitando chamadas diretas à API espalhadas pelo código.
- Usar variáveis de ambiente para tokens, URLs e configurações.
- Garantir que o fluxo funcione em sandbox antes de produção.
- Tratar carrinhos com produtos de múltiplos fornecedores separando a cotação por origem.

---

## 4. Regra central de carrinho e fornecedores

Cada fornecedor possui um CEP de origem próprio.

Como a cotação de frete depende de:

- CEP de origem;
- CEP de destino;
- peso;
- dimensões;
- valor dos produtos;
- volumes/produtos;

o carrinho deve ser agrupado por fornecedor.

Exemplo:

```text
Carrinho
├── Fornecedor A
│   ├── Produto 1
│   └── Produto 2
│   └── Frete A
│
└── Fornecedor B
    ├── Produto 3
    └── Frete B
```

O cliente deve visualizar o frete por grupo de fornecedor e o total geral:

```text
Subtotal dos produtos: R$ 180,00
Frete Fornecedor A: R$ 22,90
Frete Fornecedor B: R$ 18,50
Total do pedido: R$ 221,40
```

No MVP, se o sistema ainda não estiver preparado para múltiplos fornecedores no mesmo carrinho, implementar uma destas estratégias:

### Estratégia preferencial

Permitir múltiplos fornecedores e calcular frete separadamente por fornecedor.

### Estratégia temporária aceitável

Bloquear carrinho com fornecedores diferentes e exibir mensagem:

```text
Neste momento, finalize separadamente produtos de fornecedores diferentes.
```

A estratégia preferencial deve ser adotada se a estrutura atual do projeto permitir.

---

## 5. Dados logísticos obrigatórios

### 5.1. No cadastro do fornecedor

Adicionar ou validar os seguintes campos:

```text
nome_responsavel_envio
telefone_envio
email_envio
cep_origem
logradouro_origem
numero_origem
complemento_origem
bairro_origem
cidade_origem
estado_origem
documento_remetente
```

Observações:

- `cep_origem` é obrigatório para cotação.
- O endereço de origem será usado como remetente.
- O fornecedor não precisa ter conta própria no Melhor Envio neste MVP, salvo se a regra operacional futura exigir.
- O MSD centraliza a integração.

---

### 5.2. No cadastro do produto

Adicionar ou validar os seguintes campos:

```text
peso_kg
altura_cm
largura_cm
comprimento_cm
valor_seguro
permite_frete
```

Regras:

- Peso em quilogramas.
- Dimensões em centímetros.
- Nenhum produto físico pode ser vendido sem peso e dimensões.
- Caso o produto esteja incompleto, o fornecedor deve ver um alerta no painel.
- Produtos sem dados logísticos completos não devem aparecer como disponíveis para compra.

Sugestão de validação:

```text
peso_kg > 0
altura_cm > 0
largura_cm > 0
comprimento_cm > 0
```

---

## 6. Novas entidades sugeridas

Adaptar os nomes ao padrão já existente no projeto.

### 6.1. shipping_providers

Armazena operadores logísticos disponíveis.

```text
id
name
code
active
settings_json
created_at
updated_at
```

Registro inicial:

```text
name: Melhor Envio
code: melhor_envio
active: true
```

---

### 6.2. shipping_quotes

Armazena cotações feitas no checkout.

```text
id
cart_id nullable
order_id nullable
supplier_id
shipping_provider_id
origin_zipcode
destination_zipcode
service_id
service_name
company_name
price
custom_price
delivery_time
custom_delivery_time
raw_response_json
expires_at
selected
created_at
updated_at
```

Regras:

- Salvar o retorno bruto da API em `raw_response_json`.
- Usar `custom_price` e `custom_delivery_time` quando disponíveis.
- Uma cotação selecionada deve ficar marcada como `selected = true`.

---

### 6.3. shipments

Representa o envio associado a um pedido ou a um grupo de fornecedor dentro do pedido.

```text
id
order_id
supplier_id
shipping_provider_id
shipping_quote_id
melhor_envio_order_id nullable
melhor_envio_protocol nullable
tracking_code nullable
tracking_url nullable
label_url nullable
status
status_label
posted_at nullable
delivered_at nullable
last_synced_at nullable
raw_payload_json
created_at
updated_at
```

Status internos sugeridos:

```text
pending_quote
quoted
selected
waiting_order_payment
ready_to_create_label
label_requested
label_generated
posted
in_transit
delivered
delivery_failed
cancelled
error
```

---

### 6.4. shipment_events

Histórico de eventos logísticos.

```text
id
shipment_id
event_code
event_label
description
location
event_date
raw_payload_json
created_at
updated_at
```

---

## 7. Variáveis de ambiente

Criar entradas no `.env.example`:

```env
MELHOR_ENVIO_ENV=sandbox
MELHOR_ENVIO_SANDBOX_URL=https://sandbox.melhorenvio.com.br
MELHOR_ENVIO_PRODUCTION_URL=https://www.melhorenvio.com.br
MELHOR_ENVIO_CLIENT_ID=
MELHOR_ENVIO_CLIENT_SECRET=
MELHOR_ENVIO_REDIRECT_URI=
MELHOR_ENVIO_ACCESS_TOKEN=
MELHOR_ENVIO_REFRESH_TOKEN=
MELHOR_ENVIO_USER_AGENT="MSD Mercado Solidario Digital (suporte@seudominio.com.br)"
MELHOR_ENVIO_WEBHOOK_SECRET=
```

Importante:

- Nunca deixar token fixo no código.
- Nunca commitar credenciais reais.
- Separar sandbox e produção.
- Toda requisição à API deve enviar `User-Agent` configurado.

---

## 8. Camada de serviço obrigatória

Criar uma classe de serviço para encapsular a integração.

Sugestão:

```text
app/Services/Shipping/ShippingProviderInterface.php
app/Services/Shipping/MelhorEnvioShippingService.php
app/Services/Shipping/ShippingQuoteService.php
app/Services/Shipping/ShipmentService.php
```

### 8.1. Interface

```php
interface ShippingProviderInterface
{
    public function quote(array $payload): array;

    public function createShipment(array $payload): array;

    public function payShipment(array $payload): array;

    public function generateLabel(array $payload): array;

    public function printLabel(array $payload): array;

    public function track(string $trackingCode): array;
}
```

A interface deve existir mesmo que, no MVP, alguns métodos fiquem parcialmente preparados.

---

## 9. Fluxo do cliente

### 9.1. Carrinho

No carrinho, o cliente informa ou confirma o CEP de entrega.

O sistema deve:

1. Agrupar os itens por fornecedor.
2. Validar se todos os produtos possuem peso e dimensões.
3. Montar payload de cotação para cada fornecedor.
4. Consultar o Melhor Envio.
5. Exibir as opções de frete por fornecedor.
6. Permitir seleção de uma opção por fornecedor.
7. Recalcular total do pedido.

---

### 9.2. Checkout

Ao clicar em finalizar pedido:

1. Validar se há frete selecionado para cada grupo de fornecedor.
2. Criar o pedido.
3. Criar os registros de `shipping_quotes` vinculados ao pedido.
4. Criar os registros de `shipments` com status inicial.
5. Avançar para o fluxo de pagamento ou, no MVP atual, para a página “recebemos seu pedido”.

Como o projeto ainda não terá tela real de cartão, manter a simulação existente:

```text
Cliente clica em pagamento → sistema cria pedido → página “Recebemos seu pedido”.
```

Mas o frete já deve estar gravado no pedido e no total.

---

## 10. Fluxo do fornecedor

No painel do fornecedor, incluir uma seção de expedição.

### 10.1. Lista de pedidos para enviar

Exibir pedidos com:

```text
número do pedido
cliente
data
produtos
serviço de frete escolhido
prazo
status do envio
botão gerar etiqueta
botão imprimir etiqueta
código de rastreio
```

### 10.2. Geração de etiqueta

Fluxo esperado:

1. Pedido confirmado.
2. Fornecedor acessa pedidos pendentes de envio.
3. Sistema cria envio no Melhor Envio, se ainda não criado.
4. Sistema solicita pagamento/liberação da etiqueta conforme estratégia definida.
5. Sistema gera etiqueta.
6. Sistema salva link ou arquivo da etiqueta.
7. Fornecedor imprime.
8. Sistema altera status para `label_generated`.

Observação operacional importante:

No MVP, pode ser necessário que o MSD mantenha saldo/carteira no Melhor Envio para liberar etiquetas. Caso a API exija etapa de pagamento ou saldo, deixar isso tratado no serviço e documentado com logs claros.

---

## 11. Rastreio e webhooks

Criar rota pública para receber webhooks do Melhor Envio:

```text
POST /webhooks/melhor-envio
```

A rota deve:

1. Receber payload.
2. Validar assinatura HMAC-SHA256 quando disponível.
3. Localizar o shipment.
4. Registrar evento em `shipment_events`.
5. Atualizar status interno do shipment.
6. Retornar resposta HTTP 200 rapidamente.

Nunca fazer processamento pesado diretamente no webhook. Se possível, despachar job/fila.

Também criar rotina alternativa de sincronização:

```text
php artisan shipments:sync-melhor-envio
```

Essa rotina deve buscar envios pendentes e atualizar status em caso de falha de webhook.

---

## 12. Mapeamento de status

Criar uma camada de tradução de status externos para status internos.

Exemplo:

```php
[
    'released' => 'label_generated',
    'posted' => 'posted',
    'in_transit' => 'in_transit',
    'delivered' => 'delivered',
    'undelivered' => 'delivery_failed',
    'cancelled' => 'cancelled',
]
```

Não espalhar strings da API pelo sistema.

---

## 13. Regras de preço e total do pedido

O total do pedido deve considerar:

```text
subtotal_produtos
+ total_frete
= total_pedido
```

O frete não deve entrar no cálculo da comissão solidária, salvo se já existir regra explícita em contrário.

Regra recomendada:

```text
Comissão/campanha é calculada apenas sobre o valor dos produtos.
Frete é repassado para custear a logística.
```

Exemplo:

```text
Produtos: R$ 200,00
Frete: R$ 25,00
Total pago: R$ 225,00
Base da comissão solidária: R$ 200,00
```

---

## 14. Telas a implementar ou ajustar

### 14.1. Fornecedor — Cadastro/edição de endereço logístico

Adicionar bloco:

```text
Dados de envio
```

Campos:

```text
CEP
Endereço
Número
Complemento
Bairro
Cidade
Estado
Telefone de contato para envio
E-mail de contato para envio
```

---

### 14.2. Produto — Dados logísticos

Adicionar bloco:

```text
Dados para cálculo de frete
```

Campos:

```text
Peso
Altura
Largura
Comprimento
Valor segurado
```

---

### 14.3. Carrinho

Adicionar:

```text
Campo de CEP
Botão calcular frete
Opções de frete por fornecedor
Resumo do pedido com frete
```

---

### 14.4. Checkout / Pedido recebido

Exibir:

```text
Produtos
Frete escolhido
Prazo estimado
Total
Botão acompanhar pedido
```

---

### 14.5. Acompanhamento do pedido

Exibir:

```text
Status do pedido
Status do envio
Código de rastreio
Histórico de eventos logísticos
```

---

### 14.6. Fornecedor — Expedição

Criar ou ajustar tela:

```text
Pedidos a enviar
```

Ações:

```text
Ver detalhes
Gerar etiqueta
Imprimir etiqueta
Informar/visualizar rastreio
Marcar como postado manualmente, se necessário
```

---

## 15. Controllers e rotas sugeridas

Adaptar ao padrão do projeto.

```php
Route::post('/cart/shipping/quote', [CartShippingController::class, 'quote'])->name('cart.shipping.quote');
Route::post('/cart/shipping/select', [CartShippingController::class, 'select'])->name('cart.shipping.select');

Route::get('/supplier/shipments', [SupplierShipmentController::class, 'index'])->name('supplier.shipments.index');
Route::post('/supplier/shipments/{shipment}/create-label', [SupplierShipmentController::class, 'createLabel'])->name('supplier.shipments.create-label');
Route::get('/supplier/shipments/{shipment}/print-label', [SupplierShipmentController::class, 'printLabel'])->name('supplier.shipments.print-label');

Route::post('/webhooks/melhor-envio', [MelhorEnvioWebhookController::class, 'handle'])->name('webhooks.melhor-envio');
```

---

## 16. Jobs sugeridos

```text
CreateMelhorEnvioShipmentJob
GenerateMelhorEnvioLabelJob
SyncMelhorEnvioTrackingJob
ProcessMelhorEnvioWebhookJob
```

Usar jobs se o projeto já estiver com filas configuradas. Se não estiver, manter services síncronos, mas com estrutura preparada para migração futura.

---

## 17. Tratamento de erros

O sistema deve tratar:

- produto sem peso;
- produto sem dimensões;
- fornecedor sem CEP de origem;
- cliente sem CEP de destino;
- Melhor Envio indisponível;
- serviço de frete indisponível para a rota;
- divergência entre cotação salva e cotação atual;
- erro na geração de etiqueta;
- ausência de saldo para compra/liberação de etiqueta;
- webhook inválido;
- assinatura inválida;
- shipment não encontrado;
- pedido cancelado antes de postar.

Mensagens amigáveis para o usuário final:

```text
Não foi possível calcular o frete para este endereço. Verifique o CEP ou escolha outro produto.
```

Mensagem para fornecedor:

```text
Complete os dados logísticos deste produto antes de disponibilizá-lo para venda.
```

Logs técnicos devem registrar payload, resposta e contexto sem expor tokens.

---

## 18. Segurança

- Validar autorização do fornecedor antes de acessar shipments.
- Fornecedor só pode ver envios dos próprios pedidos.
- Webhook deve validar assinatura.
- Tokens devem ficar no `.env`.
- Nunca expor resposta bruta da API ao cliente.
- Sanitizar payloads recebidos.
- Registrar logs sem dados sensíveis desnecessários.
- Proteger rotas de fornecedor com middleware de autenticação e autorização.

---

## 19. Testes obrigatórios

Criar testes automatizados para:

### 19.1. Produto

- Produto físico sem peso não pode ser publicado.
- Produto físico sem dimensões não pode ser publicado.
- Produto com dados completos pode ser vendido.

### 19.2. Fornecedor

- Fornecedor sem CEP de origem não pode ter frete calculado.
- Fornecedor só acessa seus próprios envios.

### 19.3. Carrinho

- Carrinho calcula frete para um fornecedor.
- Carrinho agrupa produtos por fornecedor.
- Carrinho exige uma opção de frete selecionada.
- Total do pedido inclui frete.
- Comissão solidária usa apenas subtotal dos produtos.

### 19.4. Melhor Envio Service

Mockar as respostas da API para:

- cotação bem-sucedida;
- cotação sem serviços disponíveis;
- erro de autenticação;
- erro de API;
- geração de etiqueta bem-sucedida;
- retorno de rastreio.

### 19.5. Webhook

- Webhook válido atualiza shipment.
- Webhook inválido é rejeitado.
- Evento recebido é registrado em `shipment_events`.
- Status externo é traduzido para status interno.

---

## 20. Critérios de aceite

A implementação será considerada concluída quando:

1. Produtos tiverem dados logísticos obrigatórios.
2. Fornecedores tiverem endereço de origem.
3. O cliente conseguir calcular frete no carrinho.
4. O cliente conseguir selecionar uma opção de frete.
5. O pedido gravar a opção de frete escolhida.
6. O total do pedido incluir o frete.
7. A comissão/campanha não for calculada sobre o frete.
8. O fornecedor visualizar pedidos a enviar.
9. O sistema tiver estrutura para gerar etiqueta pelo Melhor Envio.
10. O sistema tiver rota de webhook.
11. Os status logísticos forem registrados.
12. Os testes automatizados cobrirem os fluxos principais.
13. O código estiver desacoplado por services/interfaces.
14. A estética existente do MSD não for quebrada.
15. Nenhuma regra de dropshipping for criada.

---

## 21. Ordem recomendada para o Codex implementar

Implementar em etapas, sem quebrar o que já existe.

### Etapa 1 — Banco de dados

- Criar migrations.
- Adicionar campos logísticos.
- Criar seeds para `shipping_providers`.

### Etapa 2 — Models e relacionamentos

- Ajustar models existentes.
- Criar models de frete/envio/eventos.
- Criar casts JSON onde necessário.

### Etapa 3 — Validações

- Produto.
- Fornecedor.
- Checkout.

### Etapa 4 — Melhor Envio Service

- Criar interface.
- Criar service do Melhor Envio.
- Configurar sandbox.
- Criar métodos de cotação.

### Etapa 5 — Carrinho

- Campo CEP.
- Agrupamento por fornecedor.
- Cotação.
- Seleção de frete.
- Total com frete.

### Etapa 6 — Pedido

- Persistir frete selecionado.
- Criar shipments.
- Exibir dados de frete no pedido recebido.

### Etapa 7 — Painel do fornecedor

- Tela de pedidos a enviar.
- Ações de etiqueta.
- Visualização de rastreio.

### Etapa 8 — Webhook e tracking

- Rota pública.
- Validação de assinatura.
- Registro de eventos.
- Atualização de status.

### Etapa 9 — Testes

- Unitários.
- Feature.
- Mock da API.

### Etapa 10 — Revisão final

- Conferir UI.
- Conferir permissões.
- Conferir logs.
- Conferir `.env.example`.
- Conferir documentação interna.

---

## 22. Prompt direto para execução pelo Codex

Use o texto abaixo como instrução principal:

```text
Implemente no projeto MSD a integração de frete usando Melhor Envio para fornecedores próprios do Tipo A. Não implemente dropshipping.

O fornecedor deve cadastrar dados logísticos próprios, incluindo CEP de origem e dados de remetente. Os produtos devem ter peso e dimensões obrigatórios. No carrinho, o cliente deve informar CEP de destino, e o sistema deve calcular frete via Melhor Envio, agrupando os itens por fornecedor. O cliente deve selecionar uma opção de frete para cada fornecedor antes de finalizar o pedido.

O total do pedido deve incluir o frete, mas a comissão solidária/campanha deve ser calculada apenas sobre o subtotal dos produtos, não sobre o frete.

Crie as tabelas e models necessários para shipping_providers, shipping_quotes, shipments e shipment_events, adaptando os nomes ao padrão do projeto. Crie uma camada de serviço desacoplada para o Melhor Envio, com interface genérica de ShippingProvider, usando variáveis de ambiente para sandbox, produção, tokens, User-Agent e webhook secret.

No painel do fornecedor, implemente uma área de expedição com pedidos a enviar, serviço de frete escolhido, geração/impressão de etiqueta e rastreio. Crie uma rota pública para webhooks do Melhor Envio, validando assinatura HMAC-SHA256 quando disponível, registrando eventos e atualizando status interno do envio.

Mantenha a estética atual do projeto, não altere o que já funciona no módulo de fornecedor, cliente e pedido, exceto o necessário para adicionar frete. Crie testes automatizados para produto, fornecedor, carrinho, pedido, serviço Melhor Envio e webhook. Use mocks para a API externa. Atualize o .env.example e documente os pontos operacionais necessários para ativação em produção.
```

---

## 23. Observação final de arquitetura

O Melhor Envio deve ser tratado como um fornecedor de infraestrutura logística, não como parte do domínio central do MSD.

A regra de negócio do MSD continua sendo:

```text
Cliente compra produtos
Fornecedor vende e despacha
Campanha recebe destinação solidária
MSD coordena pedido, pagamento, frete e rastreio
```

A logística entra como módulo acoplado ao pedido, mas desacoplado da comissão, da campanha e do pagamento.