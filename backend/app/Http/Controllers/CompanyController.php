<?php

namespace App\Http\Controllers;

use App\Models\CompanyModel;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
     try {
        $company = CompanyModel::all();

        if (count($company) > 0){
            return response()->json($company, 200);
        }else{
            return response()->json(['message' => 'No company found'], 400);
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
         //1. Validate Request
         $request->validate([
            "company_name" => "required|unique:company",
        ]);

        //2. Create Company
        $company_data = CompanyModel::create([
            "company_name"=>$request->company_name,
        ]);

        //3. Process the Result
        if ($company_data) {
            return response()->json($company_data, 201);
        }else{
            return response()->json("Failed to add new company");
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
        //
    }
}