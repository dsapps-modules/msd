import 'package:flutter/material.dart';

import '../../config/images.dart';
import '../../data/data_model/cart_model.dart';
import 'ecommerce_v2_models.dart';

class EcommerceData {
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

  static const orderings = <String>[
    'Relevancia',
    'Menor preco',
    'Maior preco',
    'Melhor avaliacao',
  ];

  static const campaigns = <EcommerceCampaign>[
    EcommerceCampaign(
      id: 201,
      slug: 'clareamento-solidario-2026',
      title: 'Clareamento Solidario 2026',
      subtitle: 'Campanha premium de alta conversao',
      description:
          'Narrativa visual forte para divulgar um portfólio de clareamento com linguagem moderna e foco em resultado.',
      supplier: 'Dental Shop Brasil',
      goal: 68000,
      period: 'Jan - Dez 2026',
      status: 'Em destaque',
      bannerImage: Images.featured,
      gradient: [Color(0xFF0F172A), Color(0xFF1D4ED8)],
      accentColor: Color(0xFF60A5FA),
      productIds: [1001, 1002],
    ),
    EcommerceCampaign(
      id: 202,
      slug: 'sorriso-tech',
      title: 'Sorriso Tech',
      subtitle: 'Tecnologia que vende com contexto',
      description:
          'Campanha com visual limpo, cards de produto e apelo tecnológico para conversao em mobile e desktop.',
      supplier: 'Oral Prime',
      goal: 42000,
      period: 'Fev - Ago 2026',
      status: 'Ativa',
      bannerImage: Images.home,
      gradient: [Color(0xFF082F49), Color(0xFF0EA5E9)],
      accentColor: Color(0xFF38BDF8),
      productIds: [1002, 1003],
    ),
    EcommerceCampaign(
      id: 203,
      slug: 'higiene-total',
      title: 'Higiene Total',
      subtitle: 'Produtos essenciais com recorrencia',
      description:
          'Campanha visualmente leve para vender recorrencia com clareza e sem ruído de marketplace antigo.',
      supplier: 'Sorriso Distribuidora',
      goal: 31000,
      period: 'Mar - Nov 2026',
      status: 'Oferta',
      bannerImage: Images.office,
      gradient: [Color(0xFF14532D), Color(0xFF22C55E)],
      accentColor: Color(0xFF86EFAC),
      productIds: [1003, 1004],
    ),
  ];

  static const products = <EcommerceProduct>[
    EcommerceProduct(
      id: 1001,
      slug: 'kit-clareador-dental-premium',
      title: 'Kit Clareador Dental Premium',
      campaignSlug: 'clareamento-solidario-2026',
      campaignTitle: 'Clareamento Solidario 2026',
      supplier: 'Dental Shop Brasil',
      category: 'Clareamento',
      description:
          'Kit completo com posicionamento premium, visual sofisticado e forte capacidade de destaque em campanhas.',
      price: 189.9,
      discountPercent: 12,
      rating: 4.9,
      reviews: 128,
      stock: 42,
      maxQuantity: 6,
      bannerImage: Images.featured,
      galleryImages: [Images.featured, Images.home, Images.office],
      gradient: [Color(0xFF0F172A), Color(0xFF1D4ED8)],
      accentColor: Color(0xFF60A5FA),
      highlights: ['Alta conversao', 'Kit premium', 'Embalagem moderna'],
    ),
    EcommerceProduct(
      id: 1002,
      slug: 'escova-eletrica-smartclean',
      title: 'Escova Eletrica SmartClean',
      campaignSlug: 'sorriso-tech',
      campaignTitle: 'Sorriso Tech',
      supplier: 'Oral Prime',
      category: 'Tecnologia',
      description:
          'Escova inteligente com proposta moderna e linguagem visual alinhada a um ecommerce SaaS premium.',
      price: 249.9,
      discountPercent: 0,
      rating: 4.8,
      reviews: 94,
      stock: 58,
      maxQuantity: 4,
      bannerImage: Images.home,
      galleryImages: [Images.home, Images.featured, Images.office],
      gradient: [Color(0xFF082F49), Color(0xFF0EA5E9)],
      accentColor: Color(0xFF38BDF8),
      highlights: ['Motor silencioso', 'Design smart', 'Alta retenção'],
    ),
    EcommerceProduct(
      id: 1003,
      slug: 'irrigador-oral-portatil',
      title: 'Irrigador Oral Portatil',
      campaignSlug: 'sorriso-tech',
      campaignTitle: 'Sorriso Tech',
      supplier: 'Sorriso Distribuidora',
      category: 'Higiene',
      description:
          'Produto portatil com foco em conveniencia, mobilidade e conversao simples.',
      price: 219.9,
      discountPercent: 18,
      rating: 4.7,
      reviews: 73,
      stock: 24,
      maxQuantity: 5,
      bannerImage: Images.office,
      galleryImages: [Images.office, Images.home, Images.featured],
      gradient: [Color(0xFF5B21B6), Color(0xFF8B5CF6)],
      accentColor: Color(0xFFC4B5FD),
      highlights: ['Portatil', 'Venda recorrente', 'Oferta ativa'],
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
          'Linha essencial para recorrencia, com preco acessivel e narrativa visual clara.',
      price: 39.9,
      discountPercent: 5,
      rating: 4.6,
      reviews: 156,
      stock: 88,
      maxQuantity: 12,
      bannerImage: Images.noImage,
      galleryImages: [Images.noImage, Images.office, Images.home],
      gradient: [Color(0xFF14532D), Color(0xFF22C55E)],
      accentColor: Color(0xFF86EFAC),
      highlights: ['Acessivel', 'Alta demanda', 'Recorrencia'],
    ),
  ];

  static EcommerceProduct? productBySlug(String slug) {
    for (final product in products) {
      if (product.slug == slug) return product;
    }
    return null;
  }

  static EcommerceProduct? productById(int id) {
    for (final product in products) {
      if (product.id == id) return product;
    }
    return null;
  }

  static EcommerceCampaign? campaignBySlug(String slug) {
    for (final campaign in campaigns) {
      if (campaign.slug == slug) return campaign;
    }
    return null;
  }

  static EcommerceCampaign? campaignById(int id) {
    for (final campaign in campaigns) {
      if (campaign.id == id) return campaign;
    }
    return null;
  }

  static List<EcommerceProduct> productsForCampaign(EcommerceCampaign campaign) {
    return campaign.productIds
        .map((id) => productById(id))
        .whereType<EcommerceProduct>()
        .toList();
  }

  static List<EcommerceProduct> relatedProducts(EcommerceProduct product) {
    return products
        .where((item) =>
            item.id != product.id && item.campaignSlug == product.campaignSlug)
        .toList();
  }

  static List<EcommerceCampaign> relatedCampaigns(EcommerceProduct product) {
    return campaigns
        .where((campaign) => campaign.slug != product.campaignSlug)
        .toList();
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
      price: product.finalPrice.toStringAsFixed(2),
      quantity: quantity,
      cartMaxQuantity: product.maxQuantity,
      image: product.bannerImage,
    );
  }
}

