<?php

namespace App\Console\Commands;
use App\Models\Admin;
use Config;
use Illuminate\Console\Command;
use App\Models\User;
use App\Models\ScheduleResource;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class SendEmailRemainder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */

    protected $signature = 'users:send_remainder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send remainder before 5 miniutes';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
		$user = ScheduleResource::whereRaw('start >= now() - interval ? minute', [5])->where('is_sent','0')->get();
		// $list = User::where('id',$id)->update(['status'=>'1']);
		if($user){
			foreach ($user as $s) {
				$list = ScheduleResource::where('id',$s['id'])->first();
				$students_array=explode(',',$list->students);
				$teacher=User::where('id',$s['teacher_id'])->where('status','1')->first();
				$update = ScheduleResource::where('id',$s['id'])->update(['is_sent'=>'1']);
				$email_data = [
					"email" => $teacher->email,
					"name" => $s['teacher_name'],
					"start" => $s['start'],
					"end" => $s['end'],
					"system" => $s['system_name'],
				];
				try {
					Mail::send('mailtemplate.remainder', $email_data, function ($message) use ($email_data) {
						$message->to($email_data['email'], $email_data['name'])
							->subject('Remainder mail ')
							->from('resourcetesting44@gmail.com', 'Resource');
					});
					} catch(Exception $e){
						return response()->json([
							'success' => false,
							'message' => $e->getMessage(),
						], Response::HTTP_INTERNAL_SERVER_ERROR);
					}
					foreach ($students_array as $stu) {
							// code
						$studentList = User::where('id',$stu)->where('status','1')->first();

						if($studentList)
							{
								$email1_data = [
									"email" => $studentList->email,
									"name" => $studentList->name,
									"start" => $s['start'],
									"end" => $s['end'],
									"system" => $s['system_name'],
								];
								try {
									Mail::send('mailtemplate.remainder', $email1_data, function ($message) use ($email1_data) {
										$message->to($email1_data['email'], $email1_data['name'])
											->subject('Remainder mail')
											->from('resourcetesting44@gmail.com', 'Resource');
									});
									} catch(Exception $e){
										return response()->json([
											'success' => false,
											'message' => $e->getMessage(),
										], Response::HTTP_INTERNAL_SERVER_ERROR);
									}
							}
							}
		}
	}

	}
}