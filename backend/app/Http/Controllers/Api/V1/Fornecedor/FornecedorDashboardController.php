<?php

namespace App\Http\Controllers\Api\V1\Fornecedor;

use App\Http\Controllers\Api\V1\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FornecedorDashboardController extends Controller
{
    public function dashboard(Request $request): JsonResponse
    {
        $user = auth('sanctum')->user();

        return response()->json([
            'status' => true,
            'message' => 'Fornecedor dashboard.',
            'user' => [
                'id' => $user?->id,
                'full_name' => $user?->full_name,
                'email' => $user?->email,
                'account_type' => $user?->account_type,
                'activity_scope' => $user?->activity_scope,
                'role' => $user?->accountPrimaryRoleName(),
            ],
        ]);
    }
}
