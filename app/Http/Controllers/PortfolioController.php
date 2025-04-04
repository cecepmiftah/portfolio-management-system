<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware(['auth'],  ['create', 'store', 'edit', 'update', 'destroy', 'uploadImage']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Portfolio/Index');
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        return inertia('Portfolio/Show');
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
