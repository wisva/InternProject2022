<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false);
			$table->string('email')->nullable();
			$table->string('password')->nullable();
			$table->enum('role', ['student', 'teacher'])->default('student');
			$table->string('school')->nullable();
			$table->string('class')->nullable();
			$table->enum('status', ['0', '1','2'])->default('1')->comment('0 inactive, 1 active, 2 delete');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};