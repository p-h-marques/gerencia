<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//routes for login process
Route::group(['prefix' => '/login', 'namespace' => 'AuthNew',], function(){

    Route::get('/', 'AuthController@index')->name('login');
    Route::get('/has_email', 'AuthController@has_email')->name('login.has_email');
    Route::get('/authenticate', 'AuthController@authenticate')->name('login.authenticate');
    Route::get('/do_authentication', 'AuthController@doAuthentication')->name('login.do_authentication');

});

Route::get('/admin', function () {
    return 'parabéns, você está autenticado';
})->name('admin');