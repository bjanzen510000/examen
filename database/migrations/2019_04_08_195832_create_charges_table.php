<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChargesTable extends Migration
{
    /**Runt en maakt de migrations */
    public function up()
    {
        Schema::create('charges', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('client_id');
            $table->string('name');
            $table->string('amount');
            $table->string('currency');
            $table->string('bank');
            $table->string('bic');
            $table->string('status');
            $table->string('type');
            $table->timestamps();
        });
    }

    /**Als de table al bestaat, verwijder hem dan en vervang die met de nieuwe gegevens. */
    public function down()
    {
        Schema::dropIfExists('charges');
    }
}
