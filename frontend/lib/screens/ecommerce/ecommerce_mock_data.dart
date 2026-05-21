import 'package:flutter/material.dart';

import '../../config/images.dart';
import '../../data/data_model/cart_model.dart';
import 'ecommerce_models.dart';

class EcommerceMockData {
  static const categories = <String>[
    'Todos',
    'Clareamento',
    'Higiene',
    'Tecnologia',
    'Sensibilidade',
  ];

  static const suppliers = <String>[
    'Todos',
    'Dental Shop Brasil',
    'Oral Prime',
    'Sorriso Distribuidora',
  ];

  static const statuses = <String>[
    'Todos',
    'Disponível',
    'Em destaque',
    'Oferta',
    'Esgotado',
  ];

  static const campaigns = <EcommerceCampaign>[
    EcommerceCampaign(
      id: 201,
      slug: 'clareamento-solidario-2026',
      title: 'Clareamento Solidário 2026',
      subtitle: 'Campanha de alto impacto',
      description:
          'Uma campanha focada em ativação de marca, com experiência visual premium e forte apelo de conversão.',
      supplier: 'Dental Shop Brasil',
      objective: 'Aumentar alcance e conversão em ações de bem-estar dental.',
      financialGoal: 68000,
      period: 'Jan - Dez 2026',
      status: 'Em destaque',
      bannerImage: Images.featured,
      bannerGradient: [Color(0xFF0F172A), Color(0xFF1D4ED8)],
      accentColor: Color(0xFF60A5FA),
      productSlugs: [
        'kit-clareador-dental-premium',
        'escova-eletrica-smartclean',
      ],
    ),
    EcommerceCampaign(
      id: 202,
      slug: 'sorriso-tech',
      title: 'Sorriso Tech',
      subtitle: 'Tecnologia para rotina',
      description:
          'Produtos com foco em praticidade, alto valor percebido e narrativa de tecnologia acessível.',
      supplier: 'Oral Prime',
      objective: 'Impulsionar produtos smart com visual moderno e recorrência.',
      financialGoal: 42000,
      period: 'Fev - Ago 2026',
      status: 'Ativa',
      bannerImage: Images.home,
      bannerGradient: [Color(0xFF082F49), Color(0xFF0EA5E9)],
      accentColor: Color(0xFF38BDF8),
      productSlugs: [
        'escova-eletrica-smartclean',
        'irrigador-oral-portatil',
      ],
    ),
    EcommerceCampaign(
      id: 203,
      slug: 'higiene-total',
      title: 'Higiene Total',
      subtitle: 'Ação contínua e recorrente',
      description:
          'Uma campanha de alimentação de funil com cards claros, confiança visual e chamadas diretas.',
      supplier: 'Sorriso Distribuidora',
      objective: 'Gerar recorrência com produtos essenciais e oferta simples.',
      financialGoal: 31000,
      period: 'Mar - Nov 2026',
      status: 'Oferta',
      bannerImage: Images.office,
      bannerGradient: [Color(0xFF14532D), Color(0xFF22C55E)],
      accentColor: Color(0xFF86EFAC),
      productSlugs: [
        'creme-dental-sensitive-pro',
        'irrigador-oral-portatil',
      ],
    ),
  ];

  static const products = <EcommerceProduct>[
    EcommerceProduct(
      id: 1001,
      slug: 'kit-clareador-dental-premium',
      title: 'Kit Clareador Dental Premium',
      campaignSlug: 'clareamento-solidario-2026',
      campaignTitle: 'Clareamento Solidário 2026',
      supplier: 'Dental Shop Brasil',
      category: 'Clareamento',
      description:
          'Kit completo para divulgação com alto valor percebido, acabamento premium e apelo visual elegante.',
      price: 189.9,
      financialGoal: 24000,
      status: 'Em destaque',
      discountPercent: 12,
      rating: 4.9,
      reviews: 128,
      stock: 42,
      maxQuantity: 6,
      bannerImage: Images.featured,
      galleryImages: [
        Images.featured,
        Images.home,
        Images.office,
      ],
      bannerGradient: [Color(0xFF0F172A), Color(0xFF1D4ED8)],
      accentColor: Color(0xFF60A5FA),
      features: [
        'Alta conversão',
        'Kit premium',
        'Embalagem moderna',
      ],
    ),
    EcommerceProduct(
      id: 1002,
      slug: 'escova-eletrica-smartclean',
      title: 'Escova Elétrica SmartClean',
      campaignSlug: 'sorriso-tech',
      campaignTitle: 'Sorriso Tech',
      supplier: 'Oral Prime',
      category: 'Tecnologia',
      description:
          'Escova inteligente com proposta moderna, ideal para campanhas de tecnologia e rotina premium.',
      price: 249.9,
      financialGoal: 32000,
      status: 'Disponível',
      discountPercent: 0,
      rating: 4.8,
      reviews: 94,
      stock: 58,
      maxQuantity: 4,
      bannerImage: Images.home,
      galleryImages: [
        Images.home,
        Images.featured,
        Images.office,
      ],
      bannerGradient: [Color(0xFF082F49), Color(0xFF0EA5E9)],
      accentColor: Color(0xFF38BDF8),
      features: [
        'Motor silencioso',
        'Design smart',
        'Alta retenção',
      ],
    ),
    EcommerceProduct(
      id: 1003,
      slug: 'irrigador-oral-portatil',
      title: 'Irrigador Oral Portátil',
      campaignSlug: 'sorriso-tech',
      campaignTitle: 'Sorriso Tech',
      supplier: 'Sorriso Distribuidora',
      category: 'Higiene',
      description:
          'Produto portátil com visual limpo, ideal para cards com foco em conveniência e mobilidade.',
      price: 219.9,
      financialGoal: 18000,
      status: 'Oferta',
      discountPercent: 18,
      rating: 4.7,
      reviews: 73,
      stock: 24,
      maxQuantity: 5,
      bannerImage: Images.office,
      galleryImages: [
        Images.office,
        Images.home,
        Images.featured,
      ],
      bannerGradient: [Color(0xFF5B21B6), Color(0xFF8B5CF6)],
      accentColor: Color(0xFFC4B5FD),
      features: [
        'Portátil',
        'Venda recorrente',
        'Oferta ativa',
      ],
    ),
    EcommerceProduct(
      id: 1004,
      slug: 'creme-dental-sensitive-pro',
      title: 'Creme Dental Sensitive Pro',
      campaignSlug: 'higiene-total',
      campaignTitle: 'Higiene Total',
      supplier: 'Sorriso Distribuidora',
      category: 'Sensibilidade',
      description:
          'Linha premium para público sensível, com proposta de confiança, recorrência e preço acessível.',
      price: 39.9,
      financialGoal: 12000,
      status: 'Disponível',
      discountPercent: 5,
      rating: 4.6,
      reviews: 156,
      stock: 88,
      maxQuantity: 12,
      bannerImage: Images.noImage,
      galleryImages: [
        Images.noImage,
        Images.office,
        Images.home,
      ],
      bannerGradient: [Color(0xFF14532D), Color(0xFF22C55E)],
      accentColor: Color(0xFF86EFAC),
      features: [
        'Acessível',
        'Alta demanda',
        'Recorrência',
      ],
    ),
  ];

  static EcommerceProduct? productBySlug(String slug) {
    for (final product in products) {
      if (product.slug == slug) {
        return product;
      }
    }

    return null;
  }

  static EcommerceProduct? productByCartProductId(int productId) {
    for (final product in products) {
      if (product.id == productId) {
        return product;
      }
    }

    return null;
  }

  static EcommerceCampaign? campaignBySlug(String slug) {
    for (final campaign in campaigns) {
      if (campaign.slug == slug) {
        return campaign;
      }
    }

    return null;
  }

  static List<EcommerceProduct> relatedProductsFor(EcommerceProduct product) {
    return products
        .where((candidate) =>
            candidate.slug != product.slug &&
            candidate.campaignSlug == product.campaignSlug)
        .toList();
  }

  static List<EcommerceCampaign> relatedCampaignsFor(EcommerceProduct product) {
    return campaigns.where((campaign) => campaign.slug != product.campaignSlug).toList();
  }

  static CartItem buildCartItem(EcommerceProduct product, {int quantity = 1}) {
    return CartItem(
      id: product.id,
      storeId: campaignBySlug(product.campaignSlug)?.id ?? product.id,
      areaId: 0,
      flashSaleId: 0,
      storeName: product.supplier,
      storeTaxP: '0',
      chargeAmount: '0',
      chargeType: 'flat',
      productId: product.id,
      stock: product.stock,
      variantId: 0,
      productName: product.title,
      variant: product.category,
      price: product.discountedPrice.toStringAsFixed(2),
      quantity: quantity,
      cartMaxQuantity: product.maxQuantity,
      image: product.bannerImage,
    );
  }
}
