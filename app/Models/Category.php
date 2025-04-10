<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $timestamps = false;

    protected $guarded = [];

    public function portfolios()
    {
        return $this->belongsToMany(Portfolio::class, 'category_portfolios');
    }
}
