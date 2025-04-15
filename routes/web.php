<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SocialiteController;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home', [
        //Get 6 Porfolios with the most likes and most views
        'portfolios' => Portfolio::withCount(['likes'])->orderBy('likes_count', 'desc')->orderBy('views', 'desc')->limit(6)->get()
    ]);
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


Route::post('user/avatar/{user:username}', [ProfileController::class, 'updateAvatar'])->name('user.avatar.update');


// Route::resource('user', ProfileController::class)->middleware('auth')->except(['create', 'store', 'index']);

Route::controller(ProfileController::class)->group(function () {
    Route::get('/user/{user:username}', 'show')->name('user.show');
    Route::get('/user/{user:username}/edit', 'edit')->name('user.edit');
    Route::patch('/user/{user:username}', 'update')->name('user.update');
    Route::post('/user/{user:username}/work-experiences', 'updateWorkExperiences')->name('user.work-experiences.update');
    Route::delete('/user/{user:username}/work-experiences', 'updateWorkExperiences')->name('user.work-experiences.update');

    // Route::delete('/user/{user:username}', 'destroy')->name('user.destroy');
});

Route::controller(PortfolioController::class)->group(function () {
    Route::get('/portfolios', 'index')->name('portfolios.index');
    Route::post('/portfolios', 'store')->name('portfolios.store');
    Route::get('/portfolios/create', 'create')->name('portfolios.create');
    Route::get('/portfolios/{portfolio:slug}', 'show')->name('portfolios.show');
    Route::patch('/portfolios/{portfolio:slug}', 'update')->name('portfolios.update');
    Route::get('/portfolios/{portfolio:slug}/edit', 'edit')->name('portfolios.edit');
    Route::delete('/portfolios/{portfolio}', 'destroy')->name('portfolios.destroy');

    Route::post('/upload-image', 'uploadImage')->name('upload.image');
});

Route::post('/portfolios/user/{user:username}/like', [LikeController::class, 'store'])->name('portfolios.like');


Route::get('portfolios/{portfolio}/comments', [CommentController::class, 'index'])->name('comments.index');
Route::post('comments', [CommentController::class, 'store'])->name('comments.store');
Route::delete('comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
