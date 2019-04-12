<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Charge extends Model
{
    // Gegevens voor in de database.
    protected $fillable = [
        'client_id',
        'name',
        'amount',
        'currency',
        'bank',
        'bic',
        'status',
        'type'
    ];
}
