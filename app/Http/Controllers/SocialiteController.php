<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {

            $googleUser = Socialite::driver('google')->user();

            $user = User::where('google_id', $googleUser->id)
                ->orWhere('email', $googleUser->email)->first();

            if (! $user) {
                $username = strtolower(str_replace(' ', '', $googleUser->name));

                if (User::where('username', $username)->exists()) {
                    $username .= rand(1, 100);
                }

                $user = User::create([
                    'name' => $googleUser->name,
                    'username' => $username,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'provider' => 'google',
                ]);
            }

            Auth::login($user);

            return to_route('/home');
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['googleError', 'Error Saat mencoba login dengan google']);
        }
    }
}
