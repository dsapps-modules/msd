<?php

namespace App\Helpers;

use App\Models\Translation;
use Illuminate\Support\Facades\DB;
use Modules\PaymentGateways\app\Models\Currency;

class ComHelper
{
    public static function format_coordiantes($coordinates)
    {
        $data = [];
        foreach ($coordinates as $coord) {
            $data[] = (object)['lat' => $coord[1], 'lng' => $coord[0]];
        }
        return $data;
    }

    public static function getPermissionBuildMenuTree(array $role_id, $data_list)
    {
        $tree = [];
        foreach ($data_list as $data_item) {
            // First, build children recursively
            $children = $data_item->childrenRecursive != '' && count($data_item->childrenRecursive)
                ? ComHelper::buildMenuTree($role_id, $data_item->childrenRecursive)
                : [];

            $rolePermissions = DB::table('role_has_permissions')
                ->where('permission_id', $data_item->id)
                ->whereIn('role_id', $role_id)
                ->get();

            $translations = Translation::where('translatable_type', 'App\Models\Permissions')
                ->where('translatable_id', $data_item->id)
                ->get()
                ->groupBy('language');

            $transformedData = [];
            foreach ($translations as $language => $items) {
                $itemData = [
                    'language' => $language,
                    'perm_title' => $items->where('key', 'perm_title')->first()->value ?? null,
                ];
                $transformedData[] = $itemData;
            }

            $options = [];
            $decodedOptions = $data_item->options;

            if (is_string($decodedOptions)) {
                $decodedOptions = json_decode($decodedOptions, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    $decodedOptions = [];
                }
            }

            $hasAnyPermission = false; // Track if user has any permission for this item

            if (is_array($decodedOptions)) {
                $options = array_map(function ($allowedValue) use ($rolePermissions, &$hasAnyPermission) {
                    if (is_string($allowedValue)) {
                        $hasPermission = false;

                        foreach ($rolePermissions as $rolePermission) {
                            $permValue = null;
                            if (is_object($rolePermission)) {
                                if (property_exists($rolePermission, $allowedValue)) {
                                    $permValue = $rolePermission->$allowedValue;
                                } elseif (property_exists($rolePermission, strtolower($allowedValue))) {
                                    $permValue = $rolePermission->{strtolower($allowedValue)};
                                }
                            } else {
                                if (isset($rolePermission[$allowedValue])) {
                                    $permValue = $rolePermission[$allowedValue];
                                } elseif (isset($rolePermission[strtolower($allowedValue)])) {
                                    $permValue = $rolePermission[strtolower($allowedValue)];
                                }
                            }

                            if ($permValue !== null && ($permValue === 1 || $permValue === '1' || $permValue === true || $permValue === 'true')) {
                                $hasPermission = true;
                                $hasAnyPermission = true; // Mark that this item has at least one permission
                                break;
                            }
                        }

                        return [
                            'label' => $allowedValue,
                            'value' => $hasPermission,
                        ];
                    }
                    return null;
                }, $decodedOptions);

                $options = array_filter($options);

                // Filter options to only include those with true values
                $options = array_filter($options, function($option) {
                    return $option['value'] === true;
                });
            }

            // Only include this permission if:
            // 1. User has at least one permission (hasAnyPermission = true), OR
            // 2. It has children with permissions, OR
            // 3. It's a parent that should be shown for structure (but we'll check children)
            $hasChildrenWithPermissions = !empty($children);

            if ($hasAnyPermission || $hasChildrenWithPermissions) {
                $tree[] = [
                    'id' => $data_item->id,
                    'perm_title' => $data_item->perm_title,
                    'perm_name' => $data_item->name,
                    'type' => $data_item->type ?? null,
                    'icon' => $data_item->icon,
                    'translations' => $transformedData,
                    'options' => array_values($options), // Re-index array
                    'children' => $children,
                ];
            }
        }
        return $tree;
    }

// Also update the propagateViewTrue method to work with filtered permissions
    private function propagateViewTrue(&$permissions)
    {
        foreach ($permissions as &$permission) {
            if (!empty($permission['children'])) {
                // Recursively process children
                $this->propagateViewTrue($permission['children']);

                // If any child has view=true, mark parent as true
                foreach ($permission['children'] as $child) {
                    foreach ($child['options'] as $opt) {
                        if (strtolower($opt['label']) === 'view' && $opt['value'] === true) {
                            // Check if parent already has a view option
                            $parentHasView = false;
                            foreach ($permission['options'] as &$parentOpt) {
                                if (strtolower($parentOpt['label']) === 'view') {
                                    $parentOpt['value'] = true;
                                    $parentHasView = true;
                                    break;
                                }
                            }

                            // If parent doesn't have view option, add it
                            if (!$parentHasView) {
                                $permission['options'][] = [
                                    'label' => 'view',
                                    'value' => true
                                ];
                            }
                            break;
                        }
                    }
                }
            }
        }
    }


    public static function buildMenuTree(array $role_id, $data_list)
    {
        $tree = [];
        foreach ($data_list as $data_item) {
            $children = $data_item->childrenRecursive != '' && count($data_item->childrenRecursive)
                ? ComHelper::buildMenuTree($role_id, $data_item->childrenRecursive)
                : [];
            $users = DB::table('role_has_permissions')->where('permission_id', $data_item->id)->whereIn('role_id', $role_id)->first();
            $translations = Translation::where('translatable_type', 'App\Models\Permissions')->where('translatable_id', $data_item->id)->get()->groupBy('language');
            $transformedData = [];
            foreach ($translations as $language => $items) {
                $itemData = [
                    'language' => $language,
                    'perm_title' => $items->where('key', 'perm_title')->first()->value ?? null,
                ];
                $transformedData[] = $itemData;
            }

            $options = [];
            $decodedOptions = $data_item->options;
            // Check and decode options
            if (is_string($decodedOptions)) {
                $decodedOptions = json_decode($decodedOptions, true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    logger('JSON decode error for options:', [
                        'error' => json_last_error_msg(),
                        'options' => $data_item->options,
                    ]);
                    $decodedOptions = [];
                }
            }

           // Ensure decoded options is an array
            if (is_array($decodedOptions)) {
                $options = array_map(function ($allowedValue) use ($users) {
                    if (is_string($allowedValue)) {
                        return [
                            'label' => $allowedValue,
                            'value' => $users && property_exists($users, $allowedValue)
                                ? (bool)$users->$allowedValue
                                : false,
                        ];
                    }

                    // If not a string, log it and skip this item
                    logger('Invalid allowed value type:', ['allowedValue' => $allowedValue]);
                    return null; // Skip invalid values
                }, $decodedOptions);
                // Remove null values caused by invalid items
                $options = array_filter($options);
            } else {
                logger('Decoded options is not an array or is invalid:', ['decodedOptions' => $decodedOptions]);
            }

            $tree[] = [
                'id' => $data_item->id,
                'perm_title' => $data_item->perm_title,
                'perm_name' => $data_item->name,
                'type' => $data_item->type ?? null,
                'icon' => $data_item->icon,
                'translations' => $transformedData,
                'options' => $options,
                'children' => $children,
            ];
        }
        return $tree;
    }

    public static function markAssignedPermissions($permissions, $rolePermissions)
    {
        return $permissions->map(function ($permission) use ($rolePermissions) {
            // Check if the current permission is assigned
            $permission->is_assigned = $rolePermissions->contains('id', $permission->id);

            // Recursively mark children permissions
            if ($permission->relationLoaded('childrenRecursive')) {
                $permission->children = ComHelper::markAssignedPermissions(
                    $permission->children,
                    $rolePermissions
                );
            }

            return $permission;
        });
    }

    /**
     * Get exchange rate and currency code
     */
    public static function getCurrencyInfo(?string $currencyCode = null): array
    {
        // Default currency (from config, already set from DB or fallback)
        $defaultCode = config('app.default_currency', 'USD');
        // Use provided code, or fallback to default
        $code = $currencyCode ?: $defaultCode;
        // Fetch from DB once (avoid duplicate query)
        $currency = Currency::where('code', $code)->first();
        return [
            'default_currency' => $defaultCode,
            'currency_code'    => $code,
            'exchange_rate'    => $currency?->exchange_rate ?? 1, // fallback = 1
        ];
    }


}
