<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RedirectAuthenticatedUsersController extends Controller
{
    public function Home()
    {
        if (auth()->check()) {
            $user = auth()->user();
            
            if ($user->role == 'admin' && $user->id) {
                return redirect('/adminDashboard/' . $user->id);
            } elseif ($user->role == 'superadmin') {
                return redirect('/superadminDashboard');
            } else {
                return auth()->logout();
            }
        } else {
            // Handle the case where no user is authenticated
            // You can redirect to the login page or perform another action
            return redirect('/login');
        }
    }
}

