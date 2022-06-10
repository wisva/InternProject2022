<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;


use Illuminate\Http\Request;

class MailController extends Controller
{
    public function sendEmail($email_data,$student)
    {
        try{
			if($student=='student'){
				Mail::send('mailtemplate.student', $email_data, function ($message) use ($email_data) {
					$message->to($email_data['email'], $email_data['name'])
						->subject('New meeting scheduled')
						->from('resourcetesting44@gmail.com', 'Resource');
				});
			}else if($student=='register'){
				Mail::send('mailtemplate.register', $email_data, function ($message) use ($email_data) {
					$message->to($email_data['email'], $email_data['name'])
						->subject('Your Request Granted')
						->from('resourcetesting44@gmail.com', 'Resource');
				});
			}
			else{
				Mail::send('mailtemplate.teacher', $email_data, function ($message) use ($email_data) {
					$message->to($email_data['email'], $email_data['name'])
						->subject('Your Request Granted')
						->from('resourcetesting44@gmail.com', 'Resource');
				});
			}

        }
        catch(Exception $e){

        }
    }


}