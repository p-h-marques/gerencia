<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//routes for login process
Route::group(['prefix' => '/login', 'namespace' => 'AuthNew',], function(){

    Route::get('/', 'AuthController@index')->name('login');
    Route::get('/has_email', 'AuthController@has_email')->name('login.has_email');

});