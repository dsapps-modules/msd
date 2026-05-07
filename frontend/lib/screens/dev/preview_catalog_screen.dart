import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class PreviewCatalogScreen extends StatelessWidget {
  const PreviewCatalogScreen({super.key});

  static const List<Map<String, String>> deepLinkableRoutes = [
    {'label': 'Splash', 'path': '/'},
    {'label': 'Cadastro', 'path': '/registration'},
    {'label': 'Login Mobile', 'path': '/loginPage'},
    {'label': 'Login Web', 'path': '/webLogin'},
    {'label': 'Home Mobile', 'path': '/homeScreen'},
    {'label': 'Home Web', 'path': '/webHomeScreen'},
    {'label': 'Menu e Paginas', 'path': '/menuAndPage'},
    {'label': 'Favoritos', 'path': '/favoritesListScreen'},
    {'label': 'Carteira', 'path': '/myWallet'},
    {'label': 'Notificacoes', 'path': '/notificationScreen'},
    {'label': 'Configuracoes', 'path': '/settingsScreens'},
    {'label': 'Idioma', 'path': '/languageSelectionScreen'},
    {'label': 'Termos', 'path': '/termsAndCondition'},
    {'label': 'Privacidade', 'path': '/privacyPolicy'},
    {'label': 'Contato', 'path': '/contactUs'},
  ];

  static const List<Map<String, String>> contextualRoutes = [
    {
      'label': 'Endereco',
      'path': '/addDeliveryAddress?title=Casa&address=Rua+Preview&contactNumber=11999999999',
    },
    {
      'label': 'Ticket',
      'path': '/supportTicketAdd?title=Preview+Ticket&subject=Assunto+de+demo',
    },
    {
      'label': 'Checkout',
      'path': '/checkoutScreens?product_ids=1,2',
    },
    {
      'label': 'Loja Mobile',
      'path': '/storeDetailScreen?slug=preview-store',
    },
    {
      'label': 'Loja Web',
      'path': '/storeDetailWeb?slug=preview-store',
    },
    {
      'label': 'Rastreio',
      'path': '/trackOrderScreen?order_id=PREVIEW-001&order_status=processing&store_lat=-23.5505&store_long=-46.6333',
    },
    {
      'label': 'Editar Perfil',
      'path': '/profileEdite?first_name=Preview&last_name=User&phone=%2B5511999999999&country_code=BR&birthday=1995-01-01',
    },
    {
      'label': 'Produto Mobile',
      'path': '/productDisplay?slug=preview-product',
    },
    {
      'label': 'Produto Desktop',
      'path': '/desktopProductDisplay?slug=preview-product',
    },
    {
      'label': 'Deposito',
      'path': '/depositScreen?wallet_id=1&max_deposit_amount=500.00',
    },
    {
      'label': 'Nova Senha',
      'path': '/setPasswordScreen?email=preview%40example.com&token=123456',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final directCount = deepLinkableRoutes.length;
    final contextualCount = contextualRoutes.length;

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Preview Catalog',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w800,
                            color: Color(0xFF0F172A),
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'Navegue por todas as funcionalidades sem depender de dados reais.',
                          style: TextStyle(
                            fontSize: 13,
                            height: 1.3,
                            color: Color(0xFF64748B),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      _StatChip(label: '$directCount diretas'),
                      const SizedBox(height: 8),
                      _StatChip(label: '$contextualCount com preview'),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF0F172A), Color(0xFF1D4ED8)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(22),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x1A0F172A),
                      blurRadius: 18,
                      offset: Offset(0, 10),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Vitrine de funcionalidades',
                      style: TextStyle(
                        color: Color(0xFFBFDBFE),
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.5,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Acesse cada tela sem depender de fluxo dinamico.',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        height: 1.1,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Use este catalogo para validar navegacao, preview estatico e futuras customizacoes do e-commerce.',
                      style: TextStyle(
                        color: Color(0xFFDDE7F7),
                        fontSize: 14,
                        height: 1.35,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),
              const _SectionHeader(
                title: 'Atalhos principais',
                subtitle: 'Pontos de entrada mais usados no preview.',
              ),
              const SizedBox(height: 12),
              _RouteGrid(
                routes: const [
                  {'label': 'Splash', 'path': '/'},
                  {'label': 'Cadastro', 'path': '/registration'},
                  {'label': 'Login Mobile', 'path': '/loginPage'},
                  {'label': 'Login Web', 'path': '/webLogin'},
                  {'label': 'Home Mobile', 'path': '/homeScreen'},
                  {'label': 'Home Web', 'path': '/webHomeScreen'},
                ],
              ),
              const SizedBox(height: 18),
              const _SectionHeader(
                title: 'Rotas diretas',
                subtitle: 'Telas acessiveis por URL sem contexto adicional.',
              ),
              const SizedBox(height: 12),
              _RouteGrid(routes: deepLinkableRoutes),
              const SizedBox(height: 18),
              const _SectionHeader(
                title: 'Rotas com preview',
                subtitle: 'Telas que usam dados minimos para renderizacao estatica.',
              ),
              const SizedBox(height: 12),
              _RouteGrid(routes: contextualRoutes),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({
    required this.title,
    required this.subtitle,
  });

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w800,
            color: Color(0xFF0F172A),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          subtitle,
          style: const TextStyle(
            fontSize: 13,
            color: Color(0xFF64748B),
            height: 1.3,
          ),
        ),
      ],
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFF1D4ED8).withOpacity(0.1),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: const Color(0xFF1D4ED8).withOpacity(0.18)),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Color(0xFF1D4ED8),
          fontSize: 12,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class _RouteGrid extends StatelessWidget {
  const _RouteGrid({required this.routes});

  final List<Map<String, String>> routes;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final crossAxisCount = width >= 1100
            ? 3
            : width >= 720
                ? 2
                : 1;

        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: routes.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: crossAxisCount,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: crossAxisCount == 1 ? 3.3 : 2.55,
          ),
          itemBuilder: (context, index) {
            final route = routes[index];
            return _RouteCard(
              label: route['label']!,
              path: route['path']!,
              onTap: () => context.go(route['path']!),
            );
          },
        );
      },
    );
  }
}

class _RouteCard extends StatelessWidget {
  const _RouteCard({
    required this.label,
    required this.path,
    required this.onTap,
  });

  final String label;
  final String path;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Ink(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: const Color(0xFFE2E8F0)),
            boxShadow: const [
              BoxShadow(
                color: Color(0x0F0F172A),
                blurRadius: 14,
                offset: Offset(0, 8),
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      width: 10,
                      height: 10,
                      decoration: const BoxDecoration(
                        color: Color(0xFF1D4ED8),
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        label,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF0F172A),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  path,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Color(0xFF334155),
                    fontSize: 12.5,
                    height: 1.35,
                  ),
                ),
                const SizedBox(height: 10),
                Align(
                  alignment: Alignment.centerRight,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 7,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFFEFF6FF),
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: const Text(
                      'Abrir',
                      style: TextStyle(
                        color: Color(0xFF1D4ED8),
                        fontSize: 12,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
