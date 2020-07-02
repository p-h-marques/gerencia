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
        // dd($email);
        //procurar email no banco de dados e retornar true ou false
        $user = User::where('email', $email)->first();

        if($user){
            return ['has email' => true, 'name' => $user->name];
        } else {
            return ['has email' => false];
        }
    }
}
