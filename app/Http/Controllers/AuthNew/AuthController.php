<?php

namespace App\Http\Controllers\AuthNew;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index(){
        // comentado para testes
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

    public function register(Request $request){
        $credentials = $request->only('email', 'name', 'password');
        //grava no banco

        $save = User::insertOrIgnore([
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'password' => bcrypt($credentials['password']),
        ]);

        if(!$save){
            return [
                'register' => false,
                'auth' => false,
                'about' => 'Registro de usuário está duplicado.'
            ];
        }

        if (Auth::attempt($credentials)) {
            return [
                'register' => true,
                'auth' => true,
                'about' => 'Login efetuado!'
            ];
        } else {
            return [
                'register' => true,
                'auth' => false,
                'about' => 'O novo usuário foi cadastrado, mas o primeiro login não ocorreu.'
            ];
        }
    }
}
