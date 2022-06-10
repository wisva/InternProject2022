<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\Models\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Socialite;
use DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //

	public function updateUser(Request $request,$id)
{
	$data = $request->all();
	$validator = Validator::make($data,[

	   'name' => 'required|string|min:4',

	]);
	   if ($validator->fails()) {
		   return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
		}

	try {
		$user123 = User::where('id',$id)->first();
		if(!empty($user123))
		{
			if($request->new_password){
				try {
					$token = JWTAuth::getToken();
					$user = JWTAuth::toUser($token);
					if(Hash::check($request->current_password, $user->password) == false) {
						return response()->json([
							'success' => false,
							'message' => "Your current password doesn't match"
						], Response::HTTP_BAD_REQUEST);
					} else if(Hash::check($request->new_password, $user->password) == true) {
						return response()->json([
							'success' => false,
							'message' => "Please enter a password which is not similar then current password"
						], Response::HTTP_BAD_REQUEST);
					}
					User::where('id', $user->id)->update(['password' => bcrypt($request->new_password)]);
					// return response()->json([
					// 	'success' => true,
					// 	'message' => 'Your password updated successfully',
					// ], Response::HTTP_OK);

				} catch (JWTException $e) {
					return response()->json([
							'success' => false,
							'message' => 'Could not create token.',
						], Response::HTTP_INTERNAL_SERVER_ERROR);
				}
			}

		if($user123->role=='teacher'){
			$userEdit = User::where('id',$id)->update([
				'name'      => $request->name,
				'email'      => $request->email,
				// 'password'   => bcrypt($request->password),
				// 'role'      => $request->type,
				'school'      => $request->school,

			]);
		}
		else{
			$userEdit = User::where('id',$id)->update([
				'name'      => $request->name,
				'email'      => $request->email,
				// 'password'   => bcrypt($request->password),
				// 'role'      => $request->type,
				'school'      => $request->school,
				'class'      => $request->class,

			]);
		}
			if($userEdit)

			// $credentials = $request->only('email', 'password');
            // // generate token
            // $token = JWTAuth::attempt($credentials);
			{
		$use = User::where('id',$id)->first();

				return response()->json([
					'success' => true,
					'message'=> 'Update successfully',
					'data'    => $use,
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


	public function particularUser($id)
{
	try
	{
		$user = User::where('id',$id)->first();
		if(!empty($user))
		{
			return response()->json([
				'success' => true,
				'data'    => $user->makeHidden('created_at','updated_at')->toArray()
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
            $user = User::where('email',$request->email)
            ->where('status','!=','2')
            ->first();
            if(empty($user)) {
                return response()->json([
                	'success' => false,
                	'message' => 'Your account not present',
                ], Response::HTTP_BAD_REQUEST);
            }
            if($user->status==0){
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
	public function register(Request $request)
    {
    	//Validate data
        $data = $request->only('name', 'email', 'password');
        $validator = Validator::make($data, [
            'name' => 'required|string|min:4|max:50',
            'email' => 'required|regex:/(.+)@(.+)\.(.+)/i',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        try {
            //Request is valid, create new user
            $account = User::where('email',$request->email)->first();
            if($account)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'This Email Id is already Exists',
                ], Response::HTTP_BAD_REQUEST);
            }
			$user='';
			if($request->type=='teacher'){
				$user = User::create([
					'name'      => $request->name,
					'email'      => $request->email,
					'password'   => bcrypt($request->password),
					'role'      => $request->type,
					'school'      => $request->school,
					'status'      => '0',

				]);
			}
			else{
				$user = User::create([
					'name'      => $request->name,
					'email'      => $request->email,
					'password'   => bcrypt($request->password),
					'role'      => $request->type,
					'school'      => $request->school,
					'class'      => $request->clas,
					'status'      => '0',
				]);
			}


            $credentials = $request->only('email', 'password');
            // generate token
            $token = JWTAuth::attempt($credentials);



             return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data'    => $user,
                'token'   => $token
            ], Response::HTTP_OK);

        } catch (JWTException $e) {
            return response()->json([
                	'success' => false,
                	'message' => 'Could not create token.',
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}