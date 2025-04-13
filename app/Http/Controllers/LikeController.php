<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

use function Pest\Laravel\json;

class LikeController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware(['auth'], ['store']),
        ];
    }

    public function store(Request $request, User $user)
    {
        $request->validate([
            'portfolio_id' => 'required|exists:portfolios,id',
        ]);

        // Check if the user has already liked the portfolio
        if ($user->likedPortfolios()->where('portfolio_id', $request->portfolio_id)->exists()) {
            // unliked 
            $user->likedPortfolios()->where('portfolio_id', $request->portfolio_id)->delete();
            return back()->with([
                'liked' => false,
            ]);
        }

        $user->likedPortfolios()->create([
            'portfolio_id' => $request->portfolio_id,
        ]);

        return back()->with([
            'liked' => true,
        ]);
    }
}
