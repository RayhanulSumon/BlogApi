<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category_id',
        'slug',
        'caption',
        'author',
        'status'
    ];

    public function detail(){
        return $this->hasOne(BlogDetail::class);
    }
}
