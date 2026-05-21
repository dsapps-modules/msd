import 'package:flutter/material.dart';

class EcommerceCampaign {
  const EcommerceCampaign({
    required this.id,
    required this.slug,
    required this.title,
    required this.subtitle,
    required this.description,
    required this.supplier,
    required this.objective,
    required this.financialGoal,
    required this.period,
    required this.status,
    required this.bannerImage,
    required this.bannerGradient,
    required this.accentColor,
    required this.productSlugs,
  });

  final int id;
  final String slug;
  final String title;
  final String subtitle;
  final String description;
  final String supplier;
  final String objective;
  final double financialGoal;
  final String period;
  final String status;
  final String bannerImage;
  final List<Color> bannerGradient;
  final Color accentColor;
  final List<String> productSlugs;
}

class EcommerceProduct {
  const EcommerceProduct({
    required this.id,
    required this.slug,
    required this.title,
    required this.campaignSlug,
    required this.campaignTitle,
    required this.supplier,
    required this.category,
    required this.description,
    required this.price,
    required this.financialGoal,
    required this.status,
    required this.discountPercent,
    required this.rating,
    required this.reviews,
    required this.stock,
    required this.maxQuantity,
    required this.bannerImage,
    required this.galleryImages,
    required this.bannerGradient,
    required this.accentColor,
    required this.features,
  });

  final int id;
  final String slug;
  final String title;
  final String campaignSlug;
  final String campaignTitle;
  final String supplier;
  final String category;
  final String description;
  final double price;
  final double financialGoal;
  final String status;
  final double discountPercent;
  final double rating;
  final int reviews;
  final int stock;
  final int maxQuantity;
  final String bannerImage;
  final List<String> galleryImages;
  final List<Color> bannerGradient;
  final Color accentColor;
  final List<String> features;

  double get discountedPrice {
    if (discountPercent <= 0) {
      return price;
    }

    return price * (1 - discountPercent / 100);
  }

  bool get isOffer => discountPercent > 0;
}

class EcommerceOrderSummary {
  const EcommerceOrderSummary({
    required this.orderNumber,
    required this.customerName,
    required this.email,
    required this.paymentMethod,
    required this.subtotal,
    required this.shipping,
    required this.total,
    required this.itemsCount,
    required this.addressLabel,
  });

  final String orderNumber;
  final String customerName;
  final String email;
  final String paymentMethod;
  final double subtotal;
  final double shipping;
  final double total;
  final int itemsCount;
  final String addressLabel;
}
