<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
})->name('home');

Route::middleware(['guest'])->group(function () {
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
});

Route::get('auth/google', [SocialiteController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google-callback', [SocialiteController::class, 'handleGoogleCallback']);


Route::post('user/avatar/{user}', [ProfileController::class, 'updateAvatar'])->name('user.avatar.update');


Route::resource('user', ProfileController::class)->middleware('auth')->except(['create', 'store', 'index']);

Route::controller(PortfolioController::class)->group(function () {
    Route::get('/portfolios', 'index')->name('portfolios.index');
    Route::post('/portfolios', 'store')->name('portfolios.store');
    Route::get('/portfolios/create', 'create')->name('portfolios.create');
    Route::get('/portfolios/{id}', 'show')->name('portfolios.show');

    Route::post('/upload-image', 'uploadImage')->name('upload.image');
});
