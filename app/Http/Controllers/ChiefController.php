<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChiefController extends Controller
{
    public function availability()
    {
        return inertia('Chief/Availability/Index');
    }

    public function addAvailability()
    {
        return inertia('Chief/Availability/Add');
    }
}
