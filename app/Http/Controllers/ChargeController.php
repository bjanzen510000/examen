<?php

namespace App\Http\Controllers;

use App\Charge;
use Illuminate\Http\Request;

class ChargeController extends Controller
{
    public function charge()
    {
        return view('charge');
    }

    public function newCharge()
    {
        $charge = new Charge();

        $charge->fill(request()->except(['_token']));

        $charge->save();
    }
}
