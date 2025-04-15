<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Portfolio;
use App\Models\User;
use App\Models\WorkExperience;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        //create 5 categories
        $categories = Category::factory()->count(5)->create();

        //create 5 users with 10 portfolios each
        // and attach 1 random category to each portfolio
        User::factory()->count(5)
            ->has(
                WorkExperience::factory()->count(3)
            )
            ->has(
                Portfolio::factory()->count(10)
                    ->afterCreating(function (Portfolio $portfolio) use ($categories) {
                        // Attach 1 random categories ke setiap portfolio
                        $portfolio->categories()->attach(
                            $categories->random(rand(1, 1))->pluck('id')->toArray()
                        );
                    })
            )->create();
    }
}
