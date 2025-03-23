<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChiefController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/submit-login', [AuthController::class, 'submitLogin']);

Route::get('/user-register', [AuthController::class, 'userRegister']);
Route::post('/submit-user-register', [AuthController::class, 'submitUserRegister']);

Route::get('/chief-register', [AuthController::class, 'chiefRegister']);
Route::post('/submit-chief-register', [AuthController::class, 'submitChiefRegister']);


Route::middleware('auth')->group(function () {

    Route::get("/", [AuthController::class, 'dashboard'])->name('dashboard');

    Route::middleware(['role:user'])->group(function () {});

    Route::middleware(['role:chief'])->group(function () {
        Route::get("/availability", [ChiefController::class, 'availability']);
        Route::get("/add-availability", [ChiefController::class, 'addAvailability']);
    });


    Route::post('/logout', [AuthController::class, 'logout']);
});
