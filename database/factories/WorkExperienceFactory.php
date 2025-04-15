<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkExperience>
 */
class WorkExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company' => fake()->company(),
            'position' => fake()->jobTitle(),
            'description' => fake()->paragraph(2),
            'start_date' => fake()->dateTimeBetween('-5 years', '-1 year'),
            'end_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'is_current' => fake()->boolean(50),
        ];
    }
}
