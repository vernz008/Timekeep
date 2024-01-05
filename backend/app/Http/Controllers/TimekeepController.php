<?php

namespace App\Http\Controllers;

use App\Models\TimekeepModel;

use Illuminate\Http\Request;

class TimekeepController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $timekeeps = TimekeepModel::with('company', 'branch')
            ->join('company', 'company.id', '=', 'timekeep.company_id')
            ->join('branch', 'branch.id', '=', 'timekeep.branch_id')
            ->select('timekeep.id', 'company.company_name', 'branch.branch_name', 'timekeep.date_from', 'timekeep.date_to')
            ->get();

            if (count($timekeeps) > 0) {
                return response()->json($timekeeps, 200);
            }else{
                return response()->json(['message' => 'No timekeep found'], 404);
            }
        } catch (\Throwable $error) {
            throw $error;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            //1. Validate
            $request->validate([
                "company_id" => "required|integer",
                "branch_id" => "required|integer",
                "date_from" => "required",
                "date_to" => "required",
            ]);

            //2. Execute the Query
            $timekeep = TimeKeepModel::create([
                "company_id" => $request->company_id,
                "branch_id" => $request->branch_id,
                "date_from" => $request->date_from,
                "date_to" => $request->date_to,
            ]);

           //3. Process the Result
           if ($timekeep){

            $timekeeps_all = TimekeepModel::with('company', 'branch')
            ->join('company', 'company.id', '=', 'timekeep.company_id')
            ->join('branch', 'branch.id', '=', 'timekeep.branch_id')
            ->select('timekeep.id', 'company.company_name', 'branch.branch_name', 'timekeep.date_from', 'timekeep.date_to')
            ->get();
            
            return response()->json($timekeeps_all, 201);
           }else{
            return response()->json("Fail to create new timekeep.", 500);
           }
        } catch (\Throwable $error) {
            throw $error;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $timekeep = TimekeepModel::find($id);

            if (!$timekeep){
                return response()->json(['message' => "Record Not Found"], 404);  
            }else{
                $timekeep->delete($id);

                $timekeeps_all = TimekeepModel::with('company', 'branch')
                ->join('company', 'company.id', '=', 'timekeep.company_id')
                ->join('branch', 'branch.id', '=', 'timekeep.branch_id')
                ->select('timekeep.id', 'company.company_name', 'branch.branch_name', 'timekeep.date_from', 'timekeep.date_to')
                ->get();
                return response()->json($timekeeps_all, 200);
            }
        } catch (\Throwable $error) {
            throw $error;
        }
    }
}