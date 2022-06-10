<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleResource extends Model
{
    use HasFactory;
	protected $fillable = [
        'teacher_id','teacher_name', 'event_id','title', 'system','system_name','start', 'end','students','student_names', 'status','is_sent'
    ];
}