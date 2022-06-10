<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\User;
use App\Models\ScheduleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ResourceController extends Controller
{
	private $mail_service;

    public function __construct(MailController $mailService)
    {
        $this->mail_service = $mailService;
    }

	public function scheduleDelete(Request $request)
	{
		try{
			$id=$request->id;

			$list = ScheduleResource::where('event_id',$id)->update(['status'=>'2']);

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


	public function teacherRequest(Request $request)
{
	try{
		$event_id=$request->event_id;
		$teacher_id=$request->teacher_id;
		$teacher_email=$request->email;
		$teacher_name=$request->name;
		$title=$request->title;
		$system=$request->system;
		$start=$request->start;
		$end=$request->end;
		$email=$request->email;
		$students=$request->students;
		$studentsString=implode(",",$request->students);


		// $list = Resource::where('id',$id)->update(['status'=>'0']);
		$startList = ScheduleResource::where('system',$system)->where('start', '<=', $start)->where('end','>=',$start)->where('status','1')->get();
			if(count($startList)>0){
				return response()->json([
							'success' => false,
							'error'=>true,
							'message' => 'The selected system is busy.',
						], Response::HTTP_OK);
			}
			else {
				$endList = ScheduleResource::where('system',$system)->where('start', '<=', $end)->where('end','>=',$end)->where('status','1')->get();
				if(count($endList)>0){
					return response()->json([
								'success' => false,
								'error'=>true,
								'message' => 'The selected system is busy.',
							], Response::HTTP_OK);
				}
				else{

					$checkInbetween = ScheduleResource::where('system',$system)->where('start', '>=', $start)
					->where('end', '<=', $end)->get();
					if(count($checkInbetween)>0){
						return response()->json([
									'success' => false,
									'error'=>true,
									'message' => 'The selected system is busy.',
								], Response::HTTP_OK);
					}
					else {
						$resource = Resource::where('id',$system)->first();

						$student_names=[];
						foreach ($students as $s) {
							// code
						$list = User::where('id',$s)->where('status','1')->first();

						if($list)
							{
								array_push($student_names,$list->name);
								$email_data = [
									"email" => $list->email,
									"name" => $list->name,
									"teacher" => $teacher_name,
									"start" => $start,
									"end" => $end,
									"system" => $resource->name,
								];
								try {
									$this->mail_service->sendEmail($email_data,'student');
								} catch(Exception $e){
									return response()->json([
										'success' => false,
										'message' => $e->getMessage(),
									], Response::HTTP_INTERNAL_SERVER_ERROR);
								}
							}
							}
						$schedule = ScheduleResource::create([
							'teacher_id'      => $teacher_id,
							'teacher_name'      => $teacher_name,
							'event_id'      => $event_id,
							'title'   => $title,
							'system'      => $system,
							'system_name'      => $resource->name,
							'start'      => $start,
							'end'      => $end,
							'students'      => $studentsString,
							'student_names'      => implode(",",$student_names),

						]);
						if($schedule)
							{
								$email_data = [
									"email" => $teacher_email,
									"name" => $teacher_name,
									"start" => $start,
									"end" => $end,
									"system" => $resource->name,
								];
									try {
								$this->mail_service->sendEmail($email_data,'teacher');
							} catch(Exception $e){
								return response()->json([
									'success' => false,
									'message' => $e->getMessage(),
								], Response::HTTP_INTERNAL_SERVER_ERROR);
							}
							}
						else
						{
							return response()->json([
								'success' => false,
								'message' => 'Error Occured. Please contact admin.',
							], Response::HTTP_OK);
						}
						return response()->json([
							'success' => true,
							'message' => 'Schedule allocate successfully',
							'data'    => $schedule
						], Response::HTTP_OK);
					}
				}

			}

	} catch(Exception $e){
		return response()->json([
			'success' => false,
			'message' => 'There is something went wrong, please try again later',
		], Response::HTTP_INTERNAL_SERVER_ERROR);
	}
}

	public function scheduleEdit(Request $request,$id)
{
	$data = $request->all();
	$validator = Validator::make($data,[

	   'name' => 'required|string|min:4',

	]);
	   if ($validator->fails()) {
		   return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
		}

	try {
		$event_id=$request->event_id;
		$teacher_id=$request->teacher_id;
		$teacher_email=$request->email;
		$teacher_name=$request->name;
		$title=$request->title;
		$system=$request->system;
		$start=$request->start;
		$end=$request->end;
		$email=$request->email;
		$students=$request->students;
		$studentsString=implode(",",$request->students);
		$role = ScheduleResource::where('event_id',$id)->first();
		$resource = Resource::where('id',$system)->first();
		$student_names=[];
					foreach ($students as $s) {
						// code
					$list = User::where('id',$s)->where('status','1')->first();
					array_push($student_names,$list->name);
					}

		if(!empty($role))
		{
			$roleEdit = ScheduleResource::where('event_id',$id)->update([
				'teacher_id' => $teacher_id,
						'teacher_name'      => $teacher_name,
						'event_id'      => $event_id,
						'title'   => $title,
						'system'      => $system,
						'system_name'      => $resource->name,
						'start'      => $start,
						'end'      => $end,
						'students'      => $studentsString,
						'student_names'      => implode(",",$student_names),
			]);
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

	public function reportGet(Request $request)
	{
		try{
			if($request->type=='1'){
				$list = ScheduleResource::get();
			}else if($request->type=='2'){
				$list = ScheduleResource::where('teacher_id',$request->id)->get();
			}
			else if($request->type=='3'){
				$list = ScheduleResource::where('system',$request->id)->get();
			}
			else{

				$list = ScheduleResource::where('start', '>=', $request->type)
				->where('end', '<=', $request->id)->get();
			}


			$handle = fopen('export.csv', 'w');
			$arrayData=[['S.No','Title', 'Resource Name', 'Teacher Name','Start','End','Students','Status']];
			foreach ($list as $key =>$row) {
				$singleRow=[];
				array_push($singleRow, $key+1, $row->title,$row->system_name,$row->teacher_name,$row->start,$row->end,$row->student_names,$row->status);
				array_push($arrayData, $singleRow);
				// fputcsv($handle, $row);
			}

			foreach ($arrayData as $row) {
				fputcsv($handle, $row);
			}

			fclose($handle);
			if(count($list)>0)
			{
				return response()->json([
					'success' => true,
					'file' => 'export.csv',
					'data' => $list,
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

public function resourceParticularGet($id)
{
	try
	{
		$resource = Resource::where('id',$id)->first();
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


public function updateResource(Request $request,$id)
{
	$data = $request->all();
	$validator = Validator::make($data,[

	   'name' => 'required|string|min:4',

	]);
	   if ($validator->fails()) {
		   return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
		}

	try {
		$role = Resource::where('id',$id)->first();
		if(!empty($role))
		{
			$roleEdit = Resource::where('id',$id)->update($request->all());
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


	public function list(Request $request)
	{
		try{
			$list = Resource::get();
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


public function scheduleGet(Request $request)
{
	try{
		if($request->id=='admin'){
			$list = ScheduleResource::get();
		}else{
			$user = User::where('id',$request->id)->where('status','1')->first();
			if($user->role=='student'){
				$id=$request->id;
				$list = ScheduleResource::where('status','1')->get();
				$myarr= [];
				foreach ($list as $student ) {
					$feature = explode("," , $student->students);
					if(!empty($feature)){
						if(in_array($request->id, $feature)){
						array_push($myarr,$student->id);
						}
					}

				}
				$list = ScheduleResource::whereIn('id', $myarr)->get();


			}else{
				$list = ScheduleResource::where('teacher_id',$request->id)->where('status','1')->get();

			}
		}


		if(!empty($list))
		{
			$data=[];
			foreach ($list as $student ) {
					$stu = (int)$student['students'];
				$student->students = explode("," ,$stu );

					array_push($data,$student);



			}

			return response()->json([
				'success' => true,
				'data'    => $data
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


	public function resourceGet(Request $request)
{
	try{
		$list = Resource::where('status','1')->get();
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



	public function add(Request $request)
	{
		$data = $request->all();

		$validator = Validator::make($data, [
            'name' => 'required',
			'status'	=> 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
		try {
            //Request is valid, create new user
            $account = Resource::where('name',$request->name)->where('status',$request->status)->first();
            if($account)
            {
                return response()->json([
                    'success' => false,
                    'message' => 'This Resource is already Exists',
                ], Response::HTTP_BAD_REQUEST);
            }

			$resourece = Resource::create([
				'name' => $request->name,
				'status'=>'1'
				]);

			if($resourece)
			{
				return response()->json([
					'success' => true,
					'message' => 'Resource created successfully',
					'data'    => $resourece
				], Response::HTTP_OK);
			}
			else
			{
				return response()->json([
                	'success' => false,
                	'message' => 'Could not create Category.',
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
			}
	}catch(Exception $e){
		return response()->json([
			'success' => false,
			'message' => $e->getMessage(),
		], Response::HTTP_INTERNAL_SERVER_ERROR);
	}

}


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function show(Resource $resource)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function edit(Resource $resource)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Resource $resource)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function destroy(Resource $resource)
    {
        //
    }
}