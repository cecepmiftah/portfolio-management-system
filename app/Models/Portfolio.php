<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $guarded = [];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_portfolios');
    }

    public function medias()
    {
        $this->hasMany(Media::class);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    public function userLikes()
    {
        return $this->hasMany(Like::class);
    }
}
