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
        Schema::create('schedule_resources', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('teacher_id')->references('id')->on('users');
			$table->string('teacher_name')->nullable(false);
			$table->unsignedBigInteger('event_id');
			$table->string('title')->nullable(false);
			$table->string('system')->nullable(false);
			$table->string('system_name')->nullable(false);
			$table->dateTime('start')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('end')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->string('students')->nullable(false);
			$table->string('student_names')->nullable(false);
			$table->enum('status', ['0', '1','2'])->default('1')->comment('0 inactive, 1 idle, 2 delete');
			$table->enum('is_sent', ['0', '1'])->default('0')->comment('0 Unsent, 1 sent');
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
        Schema::dropIfExists('schedule_resources');
    }
};