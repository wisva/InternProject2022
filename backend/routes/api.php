<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ResourceController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('admin/login', [AdminController::class, 'login']);

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('user/get/{id}', [UserController::class, 'particularUser']);
Route::post('userUpdate/{id}', [UserController::class, 'updateUser']);

//Resource
Route::get('admin/resource/get/{id}', [ResourceController::class, 'resourceParticularGet']);
Route::get('admin/resource/list', [ResourceController::class, 'list']);
Route::post('admin/resource/add', [ResourceController::class, 'add']);
Route::put('admin/resource/edit/{id}', [ResourceController::class, 'updateResource']);


//Report
Route::get('admin/report/get/{type}/{id}', [ResourceController::class, 'reportGet']);

//Admin School
Route::post('admin/schoolAdd', [AdminController::class, 'schoolAdd']);
Route::post('admin/schoolGet', [AdminController::class, 'schoolGet']);
Route::get('admin/school/get/{id}', [AdminController::class, 'schoolGetParticular']);
Route::put('admin/school/edit/{id}', [AdminController::class, 'schoolEdit']);

//Admin Users
Route::get('admin/user/{type}', [AdminController::class, 'userGet']);
Route::get('admin/approve/{id}', [AdminController::class, 'userApprove']);
Route::delete('admin/delete/{id}', [AdminController::class, 'userDelete']);

//school get
Route::get('school/get', [AdminController::class, 'schoolfront']);
Route::get('students/{school}/{type}', [AdminController::class, 'studentsGet']);



Route::get('teacher/resource/', [ResourceController::class, 'resourceGet']);

Route::get('teacher/scheduleGet/{id}', [ResourceController::class, 'scheduleGet']);
Route::put('schedule/edit/{id}', [ResourceController::class, 'scheduleEdit']);
Route::delete('schedule/delete/{id}', [ResourceController::class, 'scheduleDelete']);

Route::post('teacher/resourcerequest', [ResourceController::class, 'teacherRequest']);
// Route::post('register', [UserController::class, 'register']);
// Route::post('login', [UserController::class, 'login']);