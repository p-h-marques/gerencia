<?php

namespace App\Http\Controllers\AuthNew;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index(){
        // if(Auth::check()){
        //     return redirect()->route('admin');
        // } else {
        //     return view('auth.main');
        // }

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

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return ['auth' => true];
        } else {
            return ['auth' => false];
        }
    }

    public function doAuthentication(){
        return redirect()->intended('admin');
    }
}
