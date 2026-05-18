<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Api\V1\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DivulgadorLoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8|max:32',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $email = strtolower(trim((string) $request->email));

        $user = User::query()
            ->whereRaw('LOWER(email) = ?', [$email])
            ->where('status', 1)
            ->first();

        if (!$user || $user->account_type !== 'divulgador' || $user->activity_scope !== 'divulgador_level') {
            return response()->json([
                'status' => false,
                'status_code' => 422,
                'message' => 'User is not a divulgador.',
            ], 422);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials.',
                'token' => null,
                'permissions' => [],
            ], 401);
        }

        $rememberMe = $request->has('remember_me');
        config(['sanctum.expiration' => $rememberMe ? null : 1440]);

        $token = $user->createToken('divulgador_auth_token');
        $accessToken = $token->accessToken;
        $accessToken->expires_at = Carbon::now()->addMinutes(1440);
        $accessToken->save();

        $roleName = $user->divulgadorPrimaryRoleName();

        return response()->json([
            'status' => true,
            'status_code' => 200,
            'message' => 'Login successful.',
            'token' => $token->plainTextToken,
            'expires_at' => $accessToken->expires_at->format('Y-m-d H:i:s'),
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'email_verified' => (bool) $user->email_verified,
            'account_type' => $user->account_type,
            'activity_scope' => $user->activity_scope,
            'role' => $roleName,
            'permissions' => $roleName ? [$roleName] : [],
        ]);
    }
}
