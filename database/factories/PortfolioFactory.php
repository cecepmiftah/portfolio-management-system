<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Portfolio>
 */
class PortfolioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'views' => rand(0, 1000),
            'title' => fake()->sentence(),
            'slug' => fake()->slug(),
            'description' => fake()->words(10, true),
            'content' => json_encode([
                'type' => 'doc',
                'content' => [
                    [
                        'type' => 'paragraph',
                        'content' => [
                            [
                                'type' => 'text',
                                'text' => fake()->paragraph(),
                            ],
                        ],
                    ],
                ],
            ]),
            'project_url' => fake()->url(),
            'project_date' => fake()->date(),

            'thumbnail' => "https://picsum.photos/seed/" . rand(1, 1000) . "/800/600",
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
