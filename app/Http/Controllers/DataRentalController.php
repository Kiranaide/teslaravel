<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DataRentalController extends Controller
{
    public function create(Request $request)
    {
        $id = Auth::user()->id;
        $mobil = $request()->input('Mobil');
        $harga = $request()->input('Harga');

        DB::insert('INSERT INTO rental (id_admin, mobil, harga) values (?, ?, ?)', [$id, $mobil, $harga]);

        $id_mobil = DB::getPdo()->lastInsertId();

        DB::insert('INSERT INTO hasilrental (id_mobil, id_admin) VALUES (?, ?)', [$id_mobil, $id]);
        return redirect()->route('adminDashboard', ['id' => $id]);
    }

    public function update(Request $request, $id)
    {
        $mobil = $request()->input('Mobil');
        $harga = $request()->input('Harga');

        DB::update('UPDATE rental SET mobil = ?, harga = ? WHERE id = ?', [$mobil,$harga,$id]);
        return redirect()->route('adminDashboard', ['id' => $id]);
    }

    public function delete($id)
    {
        DB::delete('DELETE FROM rental WHERE id = ?',[$id]);
        return redirect()->route('adminDashboard', ['id' => $id]);
    }
}
