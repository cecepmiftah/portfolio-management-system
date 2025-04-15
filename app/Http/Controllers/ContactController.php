<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\ContactFormSubmitted;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function send(Request $request, User $user)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:2000',
        ]);

        // Send notification to the profile owner
        $user->notify(new ContactFormSubmitted($validated));

        return back()->with('message', 'Your message has been sent successfully!');
    }
}
