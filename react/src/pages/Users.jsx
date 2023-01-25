import {useEffect, useState} from "react";
import axiosClient from "../axios.client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Users() {
  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  },[])

 const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false)
        console.log(data)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
 }
 const onDelete = (u) => {
    if (!window.confirm('Are you want to delete this user')){
      return
    }
    axiosClient.delete(`/users/${u.id}`)

      .then(() => {
        setNotification("User was successfully deleted")
        getUsers()
      })
  }

return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h1>Users</h1>
              <Link to="/user/new" className="btn-add">Add New</Link>
            </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Create Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loading && <tbody>
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading....
                  </td>
                </tr>
              </tbody>
              }

              {!loading &&
                <tbody>

              {users.map((u, key) => (
                <tr key={key}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link to={'/user/' + u.id} className="btn-edit">Edit </Link>
                    &nbsp;
                    <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
              }


            </table>

          </div>
        </div>
    )
}
