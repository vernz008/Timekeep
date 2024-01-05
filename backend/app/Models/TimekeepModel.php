<?php

namespace App\Models;

use App\Models\CompanyModel;
use App\Models\BranchModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimekeepModel extends Model
{
    use HasFactory;

    protected $table = "timekeep";
    protected $fillable = [
        'company_id',
        'branch_id',
        'date_from',
        'date_to',
    ];

    public function company()
    {
        return $this->belongsTo(CompanyModel::class,"company_id");
    }

    public function branch()
    {
        return $this->belongsTo(BranchModel::class,"branch_id");
    }
}