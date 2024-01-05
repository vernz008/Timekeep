<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\TimekeepController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/company', [CompanyController::class, 'index']);
Route::post('/company', [CompanyController::class, 'store']);



Route::get('/branch', [BranchController::class, 'index']);
Route::post('/branch', [BranchController::class, 'store']);


Route::get('/timekeep', [TimekeepController::class, 'index']);
Route::post('/timekeep', [TimekeepController::class, 'store']);
Route::delete('/timekeep/{id}', [TimekeepController::class, 'destroy']);