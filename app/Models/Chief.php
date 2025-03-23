<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chief extends Model
{
    protected $fillable = [
        'user_id',
        'bio',
        'cuisine_specialization',
        'experience_years',
        'hourly_rate',
        'portfolio'
    ];
}
