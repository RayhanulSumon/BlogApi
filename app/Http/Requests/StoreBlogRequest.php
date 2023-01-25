<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:55|unique:blogs,title',
            'author' => 'string|max:33',
            'category_id' => 'integer|max:33',
            'description' => 'string|max:1500',
            'slug' => 'string|max:100',
            'keywords' => 'string|max:100',
        ];
    }
}
