<?php

namespace App\Providers;

use App\Interfaces\DynamicFieldOptionInterface;
use App\Interfaces\InventoryManageInterface;
use App\Models\Order;
use App\Models\Store;
use App\Models\Customer;
use App\Models\User;
use App\Observers\OrderObserver;
use App\Observers\SellerStoreWiseObserver;
use App\Observers\CustomerObserver;
use App\Observers\StoreObserver;
use App\Observers\UserObserver;
use App\Repositories\ProductInventoryManageRepository;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind interface to repository implementation
        $this->app->bind(
            InventoryManageInterface::class,
            ProductInventoryManageRepository::class,
            DynamicFieldOptionInterface::class,
        );

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // change
        User::observe(UserObserver::class);
        Customer::observe(CustomerObserver::class);
        Store::observe(SellerStoreWiseObserver::class);
        Store::observe(StoreObserver::class);
        Order::observe(OrderObserver::class);

        // relationship add
        Relation::morphMap([
            'customer'     => Customer::class,
            'admin'        => User::class,
            'deliveryman'  => User::class,
            'store'        => Store::class,
        ]);

        $timezone =  'UTC';
        $globalCurrency =  'USD';
        if (file_exists(storage_path('installed'))) {
            $timezone = com_option_get('com_site_time_zone') ?? 'UTC';
            $globalCurrency = com_option_get('com_site_global_currency', config('app.default_currency'));
        }

        config(['app.timezone' => $timezone]);
        date_default_timezone_set($timezone);
        config(['app.default_currency' => $globalCurrency]);
    }
}
