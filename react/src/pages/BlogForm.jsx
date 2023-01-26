import React, {useEffect, useState} from 'react';
import {useParams,useNavigate} from "react-router-dom";
import axiosClient from "../axios.client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogForm = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {setNotification} = useStateContext()

  const [loading,setLoading] = useState(false)
  const [errors,setErrors] = useState(null)
  const [blog,setBlog] = useState({
    id: null,
    title: '',
    author: '',
    description: '',
    caption: '',
    keywords: '',
  })
  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/blogs/${id}`)
        .then(({data}) => {
          setLoading(false)
          console.log(data)
          setBlog(data.data)
            // debugger
        })
        .catch(() => {
          setLoading(false)
        })
    },[])
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (blog.id){
      axiosClient.put(`/blogs/${blog.id}`,blog)
        .then(({data}) => {
          setNotification('Blog Updated Successfully')
          navigate('/blogs')
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422){
            setErrors(response.data.errors)
          }
        })
    }else {
      axiosClient.post('/blogs',blog)
        .then(({data}) => {

          setNotification('Blog Created Successfully')
          navigate('/blogs')
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422){
            setErrors(response.data.errors)
          }
        })
    }


  }

  return (
    <>
      <div className="card animated">
        {blog.id && <h1>Update Post</h1>}
        {!blog.id && <h1>Add Post</h1>}
        {errors &&
          <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
        }
        {loading && <div className="text-center">Loading....</div>}
        {!loading && <form onSubmit={onSubmit}>
          <input value={blog.title} onChange={e => setBlog({...blog,title:e.target.value})} placeholder="Post Title"/>
          <input value={blog.author} onChange={e => setBlog({...blog,author:e.target.value})} placeholder="Author"/>
            <CKEditor
                editor={ ClassicEditor }
                data={blog.description}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    // console.log( 'Editor is ready to use!', editor );

                } }
                onChange={ ( event, editor ) => {

                    const data = editor.getData();

                    setBlog({...blog,description:data})
                    // console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    // console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    // console.log( 'Focus.', editor );
                } }
            />
            <br/>
            <input value={blog.keywords} onChange={e => setBlog({...blog,keywords:e.target.value})} placeholder="Keywords"/>

            <input  type="file" value={blog.caption} onChange={e => setBlog({...blog,caption:e.target.value})} placeholder="Select Image"/>
          <button className="btn-add">Save</button>
        </form>}
      </div>
    </>
  );
};

export default BlogForm;
