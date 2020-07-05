<?php

namespace App\Http\Controllers\AuthNew;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index(){
        return view('auth.main');
    }

    public function has_email(Request $request){
        $email = $request->get('email');
        $user = User::where('email', $email)->first();

        if($user){
            return [
                'has_email' => true,
                'name' => $user->name,
                'email' => $user->email
            ];
        } else {
            return ['has_email' => false];
        }
    }
}
