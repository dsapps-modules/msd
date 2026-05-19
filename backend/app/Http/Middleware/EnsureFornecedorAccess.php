<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureFornecedorAccess
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth('sanctum')->user();

        if (!$user || $user->account_type !== 'fornecedor' || $user->activity_scope !== 'fornecedor_level') {
            return response()->json([
                'message' => 'Forbidden',
                'status' => 403,
            ], Response::HTTP_FORBIDDEN);
        }

        if (!empty($roles)) {
            $userRoles = collect($user->accountRoleNames())->map(fn ($role) => strtolower((string) $role));
            $allowedRoles = collect($roles)->map(fn ($role) => strtolower(trim((string) $role)));

            if ($allowedRoles->isNotEmpty() && !$allowedRoles->intersect($userRoles)->isNotEmpty()) {
                return response()->json([
                    'message' => 'Forbidden',
                    'status' => 403,
                ], Response::HTTP_FORBIDDEN);
            }
        }

        return $next($request);
    }
}
