<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        if ($role == 'admin' && auth()->user()->role != 'admin' && $role == 'superadmin' && auth()->user()->role != 'superadmin') {
            abort(403);
        }
        if ($role == 'superadmin' && auth()->user()->role != 'superadmin') {
            abort(403);
        }
        return $next($request);
    }
}
