<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RentalController extends Controller
{
    public function apiData()
    {
        $id = Auth::user()->id;
        $month = date('M');

        $dataquery = DB::select("SELECT rental.mobil, hasilrental.$month AS bulan_ini
        FROM rental JOIN hasilrental ON rental.id = hasilrental.id_mobil
        WHERE rental.id_admin = '$id'");

        return response()->json($dataquery);
    }

    public function dataTotal()
    {
        $id = Auth::user()->id;
        $datatotalquery = DB::select("
        SELECT rental.id, rental.mobil, rental.harga, hasilrental.jan, hasilrental.feb, hasilrental.mar, hasilrental.apr, hasilrental.may, 
        hasilrental.jun, hasilrental.jul, hasilrental.aug, hasilrental.sep, hasilrental.oct, hasilrental.nov, hasilrental.dec, hasilrental.total 
        FROM rental JOIN hasilrental ON rental.id = hasilrental.id_mobil WHERE rental.id_admin = '$id'");

        return response()->json($datatotalquery);
    }
}

// $dataquery = Rental::where('outlet', auth()->user()->name)->get();

// return view('dataRental.adminDashboard', ['dataRental' => $dataquery]);