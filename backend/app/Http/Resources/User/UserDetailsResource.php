<?php

namespace App\Http\Resources\User;

use App\Actions\ImageModifier;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'name' => $this->full_name,
            'phone' => $this->phone,
            'email' => $this->email,
            'image' => $this->image,
            'image_url' => ImageModifier::generateImageUrl($this->image),
            'logo' => ImageModifier::generateImageUrl($this->image),
            'account_type' => $this->account_type,
            'divulgador_account_code' => $this->divulgador_account_code,
            'roles' => $this->divulgadorRoleNames(),
            'role' => $this->divulgadorPrimaryRoleName(),
            'status' => $this->status,
            'is_available' => (bool)$this->is_available,
            'email_verified' => $this->email_verified,
            'account_status' => $this->deactivated_at ? 'deactivated' : 'active',
            'marketing_email' => (bool)$this->marketing_email,
            'started_at' => $this->created_at->format('F d, Y'),
        ];
    }

}
