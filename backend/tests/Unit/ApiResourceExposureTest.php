<?php

namespace Tests\Unit;

use App\Http\Resources\Customer\CustomerDetailsResource;
use App\Http\Resources\Com\SiteGeneralInfoResource;
use App\Http\Resources\Seller\SellerDetailsResource;
use App\Models\Customer;
use App\Models\User;
use Tests\TestCase;

class ApiResourceExposureTest extends TestCase
{
    public function test_customer_details_resource_does_not_expose_email_verification_token(): void
    {
        $customer = new Customer([
            'email' => 'customer@example.com',
            'email_verify_token' => 'secret-token',
        ]);

        $payload = (new CustomerDetailsResource($customer))->toArray(request());

        $this->assertArrayNotHasKey('email_verify_token', $payload);
    }

    public function test_seller_details_resource_does_not_expose_sensitive_tokens_or_social_ids(): void
    {
        $seller = new User([
            'email' => 'seller@example.com',
            'email_verify_token' => 'secret-token',
            'firebase_token' => 'firebase-token',
            'google_id' => 'google-id',
            'facebook_id' => 'facebook-id',
            'apple_id' => 'apple-id',
        ]);

        $payload = (new SellerDetailsResource($seller))->toArray(request());

        $this->assertArrayNotHasKey('email_verify_token', $payload);
        $this->assertArrayNotHasKey('firebase_token', $payload);
        $this->assertArrayNotHasKey('google_id', $payload);
        $this->assertArrayNotHasKey('facebook_id', $payload);
        $this->assertArrayNotHasKey('apple_id', $payload);
    }

    public function test_site_general_info_resource_does_not_expose_recaptcha_secret_key(): void
    {
        $payload = (new SiteGeneralInfoResource([]))->toArray(request());

        $this->assertArrayNotHasKey('com_google_recaptcha_v3_secret_key', $payload);
    }
}
