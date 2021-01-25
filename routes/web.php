<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PokemonController::class, 'index']);
Route::post('read', [PokemonController::class, 'read']);
Route::post('updateFav', [PokemonController::class, 'updateFav']);
Route::post('updateImage', [PokemonController::class, 'updateImage']);

