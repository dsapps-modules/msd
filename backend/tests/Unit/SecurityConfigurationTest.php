<?php

namespace Tests\Unit;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class SecurityConfigurationTest extends TestCase
{
    public function test_default_cors_configuration_is_not_wildcard_when_env_is_empty(): void
    {
        $origins = config('cors.allowed_origins');

        $this->assertIsArray($origins);
        $this->assertNotContains('*', $origins);
        $this->assertContains('http://localhost:3000', $origins);
    }

    public function test_hmac_secret_has_no_insecure_default_fallback(): void
    {
        $this->assertNotSame('default_secret', config('hmac.secret'));
    }

    public function test_stripe_webhook_route_is_not_protected_by_customer_auth_middleware(): void
    {
        $route = Route::getRoutes()->getByName(null);
        unset($route);

        $webhookRoute = collect(Route::getRoutes()->getRoutes())
            ->first(fn ($candidate) => $candidate->uri() === 'api/v1/stripe/webhook');

        $this->assertNotNull($webhookRoute);
        $this->assertNotContains('auth:api_customer', $webhookRoute->gatherMiddleware());
    }
}
