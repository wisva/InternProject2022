<?php

namespace App\Http\Controllers;

use JWTAuth;
use Config;
use App\Models\Admin;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Socialite;
use DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    //
	private $mail_service;
    public function __construct(MailController $mailService)
    {
        //
		$this->mail_service = $mailService;
        Config::set('jwt.user', 'App\Models\Admin');
		Config::set('auth.providers.users.model', \App\Models\Admin::class);
    }


	public function userDelete(Request $request)
	{
		try{
			$id=$request->id;

			$list = User::where('id',$id)->update(['status'=>'2']);

			if($list)
		{

			return response()->json([
				'success' => true,
				'data'    => $list,
				'message' => 'Deleted Successfully.',
			], Response::HTTP_OK);
		}
		else
		{
			return response()->json([
				'success' => false,
				'message' => 'Error Occured. Please contact admin.',
			], Response::HTTP_OK);
		}
		} catch(Exception $e){
			return response()->json([
				'success' => false,
				'message' => 'There is something went wrong, please try again later',
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}


	public function schoolEdit(Request $request,$id)
{
	$data = $request->all();
	$validator = Validator::make($data,[

	   'name' => 'required|string|min:4',

	]);
	   if ($validator->fails()) {
		   return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
		}

	try {
		$role = School::where('id',$id)->first();
		if(!empty($role))
		{
			$roleEdit = School::where('id',$id)->update($request->all());
			if($roleEdit)
			{
				return response()->json([
					'success' => true,
					'message'=> 'Update successfully'
				],Response::HTTP_OK);
			}
			else
			{
				return response()->json([
					'success' => false,
					'message'=>'sorry Data is not updated try again'
				]);
			}
		}
		else{
			return response()->json([
				'success' => false,
				'message'=>'Sorry you are not having a permission to update'
			],Response::HTTP_FORBIDDEN);
		}
	} catch(Exception $e){
		return response()->json([
			'success' => false,
			'message' => $e->getMessage(),
		], Response::HTTP_INTERNAL_SERVER_ERROR);
	}
}

	public function schoolGetParticular($id)
{
	try
	{
		$resource = School::where('id',$id)->first();
		if(!empty($resource))
		{
			return response()->json([
				'success' => true,
				'data'    => $resource->makeHidden('created_at','updated_at')->toArray()
			], Response::HTTP_OK);
		}
		else
		{
			return response()->json([
				'success' => false,
				'message' => 'Sorry, Unable to get resource detail'
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	} catch(Exception $e){
		return response()->json([
			'success' => false,
			'message' => 'There is something went wrong, please try again later',
		], Response::HTTP_INTERNAL_SERVER_ERROR);
	}
}
	public function studentsGet(Request $request)
	{
		try{
			$type=$request->type;
			$school=$request->school;
			if($type=='all'){
				$list = User::where('role','student')->where('school',$school)->where('status','1')->get();

			}else{
				$list = User::where('role','student')->where('school',$school)->where('class',$type)->where('status','1')->get();

			}
			if(!empty($list))
			{
				return response()->json([
					'success' => true,
					'data'    => $list
				], Response::HTTP_OK);
			}
			else
			{
				return response()->json([
					'success' => false,
					'message' => 'List is Empty.',
				], Response::HTTP_OK);
			}
		} catch(Exception $e){
			return response()->json([
				'success' => false,
				'message' => 'There is something went wrong, please try again later',
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}


	public function userApprove(Request $request)
	{
		try{
			$id=$request->id;

			$user = User::where('id',$id)->first();
			$list = User::where('id',$id)->update(['status'=>'1']);
			$email_data = [
				"email" => $user->email,
				"name" => $user->name,
			];
			if($list)
		{
			    try {
            $this->mail_service->sendEmail($email_data,"register");
           } catch(Exception $e){
			return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
           }

			return response()->json([
				'success' => true,
				'data'    => $user
			], Response::HTTP_OK);
		}
		else
		{
			return response()->json([
				'success' => false,
				'message' => 'Error Occured. Please contact admin.',
			], Response::HTTP_OK);
		}
		} catch(Exception $e){
			return response()->json([
				'success' => false,
				'message' => 'There is something went wrong, please try again later',
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}


	public function userGet(Request $request)
	{
		try{
			$type=$request->type;
			if($type=='all'){
				$list = User::get();

			}else if($type=='pending'){
				$list = User::where('status','0')->get();

			}else if($type=='teacher'){
				$list = User::where('role','teacher')->get();

			}
			else if($type=='student'){
				$list = User::where('role','student')->get();

			}
			else{
				$list = User::where('status','1')->get();

			}
			if(!empty($list))
			{
				return response()->json([
					'success' => true,
					'data'    => $list
				], Response::HTTP_OK);
			}
			else
			{
				return response()->json([
					'success' => false,
					'message' => 'List is Empty.',
				], Response::HTTP_OK);
			}
		} catch(Exception $e){
			return response()->json([
				'success' => false,
				'message' => 'There is something went wrong, please try again later',
			], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}



	public function schoolGet(Request $request)
{
	try{
		$list = School::get();
		if(!empty($list))
		{
			return response()->json([
				'success' => true,
				'data'    => $list
			], Response::HTTP_OK);
		}
		else
		{
			return response()->json([
				'success' => false,
				'message' => 'List is Empty.',
			], Response::HTTP_OK);
		}
	} catch(Exception $e){
		return response()->json([
			'success' => false,
			'message' => 'There is something went wrong, please try again later',
		], Response::HTTP_INTERNAL_SERVER_ERROR);
	}
}
public function schoolfront(Request $request)
{
	try{
		$list = School::get();
		if(!empty($list))
		{
			return response()->json([
				'success' => true,
				'data'    => $list
			], Response::HTTP_OK);
		}
		else
		{
			return response()->json([
				'success' => false,
				'message' => 'List is Empty.',
			], Response::HTTP_OK);
		}
	} catch(Exception $e){
		return response()->json([
			'success' => false,
			'message' => 'There is something went wrong, please try again later',
		], Response::HTTP_INTERNAL_SERVER_ERROR);
	}
}

	public function schoolAdd(Request $request)
    {
    	//Validate data
        $data = $request->only('name');
        $validator = Validator::make($data, [
            'name' => 'required|string|min:4|max:50',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        try {
            //Request is valid, create new user
            $school = School::where('name',$request->name)->first();
            if($school)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'This School is already Exists',
                ], Response::HTTP_BAD_REQUEST);
            }
            $user = School::create([
                'name'      => $request->name,
            ]);

             return response()->json([
                'success' => true,
				'data'    => $user,
                'message' => 'School created successfully',
            ], Response::HTTP_OK);

        }  catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        //valid credential
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        //Request is validated
        //Crean token
        try {
            $admin = Admin::where('email',$request->email)
            ->where('status','!=','2')
            ->first();
            if(empty($admin)) {
                return response()->json([
                	'success' => false,
                	'message' => 'Your account not present',
                ], Response::HTTP_BAD_REQUEST);
            }
            if($admin->status==0){
                return response()->json([
                	'success' => false,
                	'message' => 'Your account is inactive, Please contact to admin',
                ], Response::HTTP_BAD_REQUEST);
            }
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                	'success' => false,
                	'message' => 'Login credentials are invalid.',
                ], Response::HTTP_BAD_REQUEST);
            }
            return response()->json([
                'success' => true,
                'token'   => $token,
                'data'    => JWTAuth::user()
            ], Response::HTTP_OK);

        } catch (JWTException $e) {
            return response()->json([
                	'success' => false,
                	'message' => 'Could not create token.',
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'There is something went wrong, please try again later',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function logout(Request $request)
    {
        //get token from bearer
        $token = $request->bearerToken();

        //valid credential
        $validator = Validator::make(['token'=>$token], [
            'token' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

		//Request is validated, do logout
        try {
            JWTAuth::invalidate($token);
            return response()->json([
                'success' => true,
                'message' => 'User has been logged out'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'There is something went wrong, please try again later',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function forgotPassword(Request $request)
    {
        try
        {
            $user = Admin::where('email',$request->email)->first();
            if(!empty($user))
            {
              //Add Token in Admin Table
                $add_password_token = Admin::where('email',$request->email)->update(['password_reset_token'=>Str::random(60)]);
                if($add_password_token)
                {
                    $tokenData = Admin::where('email',$request->email)->select('password_reset_token')->first();

                    $link = env('FRONT_APP_URL') . 'admin/changepassword/?token=' . $tokenData->password_reset_token . '&email=' . urlencode($request->email);

                    //Email Data
                    $email_data = ["email"=>$request->email,"name"=>$user['first_name'],'link'=>$link];

                    //Mailcontroller instace creation
                    $data = $this->mail_service->sendForgotPasswordLink($email_data);
                    if(!empty($data))
                    {
                        return $data;
                    }
                    else
                    {
                        return response()->json([
                            'success' => false,
                            'message'=> 'Mail is not sent try again'
                        ]);
                    }
                }
                else
                {
                    return response()->json([
                        'success' => false,
                        'message' => 'Provided email address was not found'
                ], Response::HTTP_UNAUTHORIZED);
                }
            }
            else
            {
                return response()->json([
                        'success' => false,
                        'message' => 'Provided email address was not found'
                ], Response::HTTP_UNAUTHORIZED);
            }
        }
        catch(Exception $e)
        {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function resetPassword(Request $request)
    {
        try
        {
            //Validate input
            $validator = Validator::make($request->all(), [
            'password' => 'required|confirmed',
            'token' => 'required']);

            //check if payload is valid before moving on
            if ($validator->fails()) {
                return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            // Validate the token
            $tokenData = Admin::where('password_reset_token', $request->token)->first();
            if(!empty($tokenData))
            {
                $user = Admin::where('password_reset_token', $request->token)->where('status','1')->first();
                if(!empty($user))
                {
                    $update_password =Admin::where('password_reset_token',$request->token)->update(['password'=>bcrypt($request->password)]);
                    if($update_password)
                    {
                        Admin::where('password_reset_token',$request->token)->update(['password_reset_token'=>'']);
                        return response()->json([
                            'success' => true,
                            'message'=>'Update Successfully',
                        ],Response::HTTP_OK);
                    }
                    else
                    {
                        return response()->json([
                            'success' => false,
                            'message'=>'Sorry password is not Reset Try Again',
                        ],Response::HTTP_INTERNAL_SERVER_ERROR);
                    }
                }
                else
                {
                    return response()->json([
                        'success' => true,
                        'message'=>'Sorry User is not found'
                    ]);
                }
            }
            else
            {
                return response()->json([
                        'success' => true,
                        'message'=>'Link is Exipred'
                ],Response::HTTP_FORBIDDEN);
            }

        }catch(Exception $e)
        {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}