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
            new Middleware(['auth', 'can:update,portfolio'],  ['edit', 'update', 'destroy']),
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
            'project_date' => 'nullable|date',
            'project_url' => 'nullable|url',
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
            'project_url' => $request->project_url,
            'project_date' => $request->project_date,
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
    public function edit(Portfolio $portfolio)
    {
        $content = json_decode($portfolio->content);

        return inertia('Portfolio/Edit', [
            'portfolio' => $portfolio,
            'content' => $content,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Portfolio $portfolio)
    {
        try {
            $validated = $request->validate([
                'title' => 'string|max:255',
                'description' => 'nullable|string|max:255',
                'content' => 'json',
                'project_url' => 'nullable|url',
                'project_date' => 'nullable|date',
                'thumbnail' => 'nullable|image|max:2048',
            ]);

            if ($request->hasFile('thumbnail')) {
                // Hapus thumbnail lama jika ada
                if ($portfolio->thumbnail) {
                    Storage::delete($portfolio->thumbnail);
                }
                $path = $request->file('thumbnail')->store('portfolio-thumbnails');
                $validated['thumbnail'] = $path;
            }

            $portfolio->fill($validated);

            if ($portfolio->isDirty()) {
                $portfolio->save();
                return redirect()->route('portfolios.show', $portfolio->slug)
                    ->with('success', 'Portfolio updated successfully!');
            } else {
                return back()->withErrors([
                    'error' => 'No changes were made'
                ]);
            }
        } catch (\Exception $e) {
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portfolio $portfolio)
    {
        // Delete the thumbnail image
        Storage::disk('public')->delete($portfolio->thumbnail);

        // Delete the portfolio
        $portfolio->delete();

        return redirect()->route('portfolios.index')->with('message', 'Portfolio deleted successfully.');
    }
}
