<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller implements HasMiddleware
{

    // Apply middleware to the controller
    public static function middleware()
    {
        return [
            new Middleware(['auth'], ['store', 'destroy']),
            new Middleware(['can:delete,comment'], ['destroy']),
        ];
    }

    // Get comments for a portfolio
    public function index(Portfolio $portfolio)
    {
        $comments = Comment::with(['user', 'replies'])
            ->where('portfolio_id', $portfolio->id)
            ->whereNull('parent_id')
            ->latest()
            ->get();

        return response()->json($comments);
    }

    // Store new comment
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        Comment::create([
            'content' => $request->content,
            'user_id' => Auth::id(),
            'portfolio_id' => $request->portfolio_id,
            'parent_id' => $request->parent_id
        ]);
        // If the comment is a reply, load the parent comment

        return back();
    }

    // Delete comment
    public function destroy(Comment $comment)
    {

        $comment->delete();

        return back();
    }
}
