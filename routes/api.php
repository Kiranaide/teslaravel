<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RentalController;
use App\Http\Controllers\ForecastingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth', 'web')->group(function()  {
    Route::get('/rental-data', [RentalController::class, 'apiData']);
    Route::get('/totalrental-data', [RentalController::class, 'dataTotal']);
    Route::get('/hasilrental-data', [ForecastingController::class, 'dataForecasting']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});