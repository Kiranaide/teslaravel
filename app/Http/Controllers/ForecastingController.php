<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ForecastingController extends Controller
{
    public function dataForecasting()
    {
        $id = Auth::user()->id;

        $dataquery = DB::select("SELECT * FROM hasilrental JOIN rental ON hasilrental.id_mobil = rental.id WHERE hasilrental.id_admin = '$id'");
        return response()->json($dataquery);
    }
}
