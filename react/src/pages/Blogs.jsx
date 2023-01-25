import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios.client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

const Blogs = () => {
  const [loading,setLoading] = useState(false)
  const [blogs,setBlogs] = useState([])

  const {setNotification} = useStateContext()

  useEffect(() => {
      getBlogs ();

  },[])

  const getBlogs = () => {
    setLoading(true)
    axiosClient.get('/blogs')
      .then(({data}) => {
        setLoading(false)
        console.log(data.data)
        setBlogs(data.data)


      })
      .catch(() => {
        setLoading(false)
      })
  }
  const onDelete = (e) => {
    if (!window.confirm("Are you want to delete this post?")){
      return
    }
    axiosClient.delete(`/products/${e}`)
      .then(() => {
        setNotification("Post successfully deleted")
          getBlogs()
      })
  }
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>Blogs</h1>
        <Link to="/add-blog" className="btn-add">Add New</Link>
      </div>

        <div className="card animated fadeInDown">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            {loading && <tbody>
            <tr>
              <td colSpan="5" className="text-center">Loading....</td>
            </tr>
            </tbody>}

            <tbody>

            {blogs.map((b,key) => (
              <tr key={key}>
                <td>{key += 1}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>
                  <Link to={'/blog/' + b.id} className="btn-edit">Edit </Link>
                  &nbsp;
                  <button onClick={() => onDelete(b.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
              ))}



            </tbody>
          </table>
        </div>

      </div>
  );
};

export default Blogs;
