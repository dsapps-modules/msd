<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SummaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'summary' => [
                'store' => $this->buildItem('store-icon', 'Lojas', $this->total_stores),
                'store_owner' => $this->buildItem('user-icon', 'Vendores', $this->total_sellers),
                'product' => $this->buildItem('product-icon', 'Produtos', $this->total_products),
                'order' => $this->buildItem('order-icon', 'Pedidos', $this->total_orders),
                'customer' => $this->buildItem('customer-icon', 'Clientes', $this->total_customers),
                'staff' => $this->buildItem('staff-icon', 'Funcionários', $this->total_staff),
                'deliveryman' => $this->buildItem('deliveryman-icon', 'Entregadores', $this->total_deliverymen),
                'area' => $this->buildItem('area-icon', 'Áreas', $this->total_areas),
                'category' => $this->buildItem('category-icon', 'Categorias', $this->total_categories),
                'brand' => $this->buildItem('brand-icon', 'Marcas', $this->total_brands),
                'slider' => $this->buildItem('slider-icon', 'Sliders', $this->total_sliders),
                'coupon' => $this->buildItem('coupon-icon', 'Cupons', $this->total_coupons),
                'page' => $this->buildItem('page-icon', 'Páginas', $this->total_pages),
                'blog' => $this->buildItem('blog-icon', 'Blogs', $this->total_blogs),
                'ticket' => $this->buildItem('ticket-icon', 'Tickets', $this->total_tickets),
            ],
            'order_summary' => [
                'pending_orders' => $this->buildItem('pending-icon', 'Pedidos Pendentes', $this->total_pending_orders),
                'completed_orders' => $this->buildItem('completed-icon', 'Pedidos Concluídos', $this->total_delivered_orders),
                'cancelled_orders' => $this->buildItem('cancelled-icon', 'Pedidos Cancelados', $this->total_cancelled_orders),
                'unassigned_orders' => $this->buildItem('unassigned-icon', 'Pedidos Não Atribuídos', $this->deliveryman_not_assigned_orders),
                'refunded_orders' => $this->buildItem('refunded-icon', 'Pedidos Reembolsados', $this->total_refunded_orders),
            ],
            'financial_summary' => [
                'total_order_amount' => $this->buildItem('earnings-icon', 'Total de Vendas', $this->total_earnings),
                'total_order_commission' => $this->buildItem('earnings-icon', 'Total de Comissões', $this->total_order_commission),
                'total_refunds' => $this->buildItem('refunds-icon', 'Total de Reembolsos', $this->total_refunds),
                'total_tax' => $this->buildItem('tax-icon', 'Total de Impostos', $this->total_tax),
                'total_withdrawals' => $this->buildItem('withdrawal-icon', 'Total de Saques', $this->total_withdrawals),
                'subscription_earnings' => $this->buildItem('subscription-icon', 'Ganhos de Assinatura', $this->total_subscription_earnings),
                'total_revenue' => $this->buildItem('revenue-icon', 'Total Revenue', $this->total_revenue),
                'total_pos_order_earnings' => $this->buildItem('pos_earnings-icon', 'Total Pos Sales', $this->total_pos_order_earnings)
            ],
        ];
    }

    /**
     * Helper method to build summary items.
     */
    private function buildItem(string $icon, string $title, $count): array
    {
        return [
            'icon' => $icon,
            'title' => $title,
            'count' => $count
        ];
    }
}
