<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
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
}
