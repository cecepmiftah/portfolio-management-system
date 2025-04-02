<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware(['auth', 'can:update,user'])
        ];
    }

    public function show(User $user)
    {
        return inertia('Profile/Show', [
            'user' => $user
        ]);
    }

    public function edit(User $user)
    {
        return inertia('Profile/Edit', [
            'user' => $user
        ]);
    }

    public function update(User $user, Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|lowercase',
            'email' => 'required|string|email|max:255',
        ]);

        $user->fill([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
        ]);

        if ($user->isDirty()) {
            $user->save();
        } else {
            return back()->withErrors([
                'error' => 'No changes were made'
            ]);
        }

        return to_route('user.edit', $user)->with('message', 'Profile updated successfully');
    }

    public function updateAvatar(User $user, Request $request)
    {

        if ($request->hasFile('avatar')) {

            $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
            $user->save();
            return back()->with('success', 'Avatar updated successfully');
        } else {

            return back()->withErrors(['error' => 'Failed to update avatar']);
        }
    }
}
