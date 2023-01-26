<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       User::create([
           'name' => 'Rayhanul Sumon',
           'email' => 'sumon.npi@gmail.com',
           'password' => bcrypt('@sumoncse')
       ]);

//       User::factory(50)->create();
    }
}
