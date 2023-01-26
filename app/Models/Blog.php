<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'user_id',
        'category_id',
        'slug',
        'caption',
        'author',
        'status'
    ];

    public function detail(){
        return $this->hasOne(BlogDetail::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
