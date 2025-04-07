<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PortfolioController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware(['auth'],  ['create', 'store', 'uploadImage']),
            new Middleware(['auth', 'can:update,destroy'],  ['edit', 'update', 'destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Portfolio/Index', [
            'portfolios' => Portfolio::with('user')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Portfolio/Create');
    }


    /* 
        Store image from editor text and return the image url
    */
    public function uploadImage(Request $request)
    {
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('portfolios-images', 'public');

            return response()->json(['url' => Storage::url($path)]);
        }
        return response()->json(['error' => 'Upload gagal'], 400);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'content' => 'required',
            'thumbnail' => 'required|image|max:2048',
        ]);

        // Store the thumbnail image
        $thumbnailPath = $request->file('thumbnail')->store('portfolios-thumbnails', 'public');

        $slug = Str::slug($request->title);

        $searchSlug = Portfolio::where('slug', Str::slug($request->title))->first();

        if ($searchSlug) {
            $slug = $slug . '-' . time();
        }

        $portfolio = Portfolio::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'slug' => $slug,
            'content' => json_encode($request->content),
            'thumbnail' => Storage::url($thumbnailPath),
        ]);

        return redirect()->route('portfolios.index')->with('success', 'Portfolio created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Portfolio $portfolio)
    {
        $content = json_decode($portfolio->content);

        return inertia('Portfolio/Show', [
            'portfolio' => $portfolio,
            'content' => $content,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
