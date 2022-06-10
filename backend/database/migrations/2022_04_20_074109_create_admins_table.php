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
        Schema::create('admins', function (Blueprint $table) {
			$table->id();
            $table->string('first_name')->nullable(false);
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('password')->nullable();
            $table->enum('gender',['male','female','others']);
            $table->string('address')->nullable();
			$table->bigInteger('phone')->nullable();
            $table->string('username')->nullable();
            $table->string('employee_role');
            $table->rememberToken();
            $table->longText('password_reset_token')->nullable();
            $table->string('profile_image')->nullable();
            $table->enum('status', ['0', '1','2'])->default('1')->comment('0 inactive, 1 active, 2 delete');
			$table->unsignedBigInteger('created_by')->nullable();
			$table->unsignedBigInteger('updated_by')->nullable();
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
        Schema::dropIfExists('admins');
    }
};