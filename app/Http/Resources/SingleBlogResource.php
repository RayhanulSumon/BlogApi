<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SingleBlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'user_id' => $this->user->id,
            'description' => $this->detail->description,
            'keywords' => $this->detail->keywords,
            'created_at' => $this->created_at->format( 'Y-m-d H:i:s'),
        ];
    }
}
