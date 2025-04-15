<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Portfolio;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
        $portfolios = Portfolio::with('user', 'likes', 'categories')->withCount('likes')->latest()->paginate(12)->withQueryString();

        return inertia('Portfolio/Index', [
            'portfolios' => $portfolios
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return inertia('Portfolio/Create', [
            'categories' => $categories,
        ]);
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
            'category' => 'required|string|max:100',
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

        $category = Category::createOrFirst([
            'name' => $request->category,
            'slug' => Str::slug($request->category),
        ]);

        $portfolio = Portfolio::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'slug' => $slug,
            'content' => json_encode($request->content),
            'project_url' => $request->project_url,
            'project_date' => $request->project_date,
            'thumbnail' => Storage::url($thumbnailPath),
        ]);

        // Attach the category to the portfolio
        $portfolio->categories()->attach($category->id);

        return redirect()->route('portfolios.index')->with('success', 'Portfolio created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Portfolio $portfolio)
    {
        $content = json_decode($portfolio->content);

        // $portfolio->with('user', 'likes', 'categories')->withCount('likes')->increment('views');
        $portfolio = Portfolio::with([
            'user',
            'likes.user' => function ($query) {
                $query->select('id', 'username', 'avatar');
            },
            'categories'
        ])->withCount('likes')->findOrFail($portfolio->id);


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
        $categories = Category::all();

        return inertia('Portfolio/Edit', [
            'portfolio' => $portfolio->load('categories'),
            'content' => $content,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Portfolio $portfolio)
    {
        try {

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string|max:255',
                'content' => 'required|json',
                'project_url' => 'nullable|url',
                'project_date' => 'nullable|date',
                'thumbnail' => 'nullable|image|max:2048',
            ]);

            if ($request->has('category')) {
                $category = Category::createOrFirst([
                    'name' => $request->category,
                    'slug' => Str::slug($request->category),
                ]);
                // Detach old categories and attach new category
                $portfolio->categories()->sync([$category->id]);
            }

            if ($request->hasFile('thumbnail')) {
                // Hapus thumbnail lama jika ada
                if ($portfolio->thumbnail) {
                    Storage::delete($portfolio->thumbnail);
                }
                $path = $request->file('thumbnail')->store('portfolios-thumbnails', 'public');
                $validated['thumbnail'] = Storage::url($path);
            }

            if ($portfolio->slug != Str::slug($request->title)) {
                // Jika slug berubah, buat slug baru
                // dan cek apakah slug sudah ada di database
                $validated['slug'] = Str::slug($request->title);
                $searchSlug = Portfolio::where('slug', Str::slug($request->title))->first();
                // Jika slug sudah ada, tambahkan timestamp
                // untuk menghindari duplikasi slug
                if ($searchSlug && $searchSlug->id != $portfolio->id) {
                    $validated['slug'] = $validated['slug'] . '-' . time();
                }
            }

            $portfolio->fill($validated);

            if ($portfolio->isDirty()) {
                $portfolio->save();

                return response()->json([
                    'message' => 'Portfolio updated successfully!',
                    'slug' => $portfolio->slug,
                ], 200);
            } else {
                return response()->json([
                    'error' => 'No changes were made.'
                ], 422);
            }
        } catch (Exception $e) {
            // Log error termasuk message dan trace
            Log::error('Error during update', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Opsional: return JSON supaya tidak balik HTML
            return response()->json([
                'error' => 'Update failed',
                'message' => $e->getMessage()
            ], 500);
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

        return back()->with('message', 'Portfolio deleted successfully.');
    }
}
