<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SebastianBergmann\CodeCoverage\Driver\Selector;

class PokemonController extends Controller
{
    public function index(){
        // $pokemons = DB::select('Select nombre, numero_pokedex from pokemon');
        // return view('pokedex',['pokemons'=>$pokemons]);
        // $pokemons = DB::table('pokemon')->get();
        return view('pokedex');
    }
    public function read(Request $request){
        $filtro = $request->input('filtro');
        if ($filtro == "") {
            $pokemons = DB::select('Select * from pokemon');
        }elseif ($filtro == "favorito") {
            $pokemons = DB::select('Select * from pokemon where favorito = 1');
        }
        else {
            $pokemons = DB::select('Select * from pokemon where nombre like ?',["%".$filtro."%"]);
        }
        // Unicamente esto para ficheros ubicados en campos blob
        foreach ($pokemons as $i ) {
            if ($i->imagen !=null) {
                $i->imagen = base64_encode($i->imagen);
            }
        }
        return response()->json($pokemons, 200);
    }

    public function updateFav(Request $request){
        try {
            DB::update('UPDATE pokemon set favorito = ? where numero_pokedex = ?', [$request->input('favorito'), $request->input('num_pokedex')]);
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        }
    }
    public function updateImage(Request $request){
        try {
            $img = $request->file('imagen')->getRealPath();
            $bin = file_get_contents($img);
            DB::update('UPDATE pokemon set imagen = ? where numero_pokedex = ?', [$bin, $request->input('num_pokedex')]);
            return response()->json(array('resultado'=>'OK'), 200);
        } catch (\Throwable $th) {
            return response()->json(array('resultado'=>'NOK'.$th->getMessage()), 200);
        }
    }
}