import { useState, useEffect } from 'react';
import axiosInstance from '../../api';
import Header from '../components/header';
import { getLoginedUserName, isLoginedUser } from "../../auth";
import { Modal } from 'react-bootstrap';

function Users() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState('-1');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const getUsers = async () => {
        const data = await axiosInstance.get('Auth');
        console.log(data.data);
        setUsers(data.data);
        setFilteredUsers(data.data);
    }
    const searchUser = (searchText) => {
        setFilteredUsers(users.filter((item) => item.username.toLowerCase().includes(searchText)))
    }

    // create delete user function
    const Deleteuser = async () => {
        if (userId != "-1"){
            setShow(false);
            await axiosInstance.delete(`Auth/${userId}`);
            // refresh users list
            getUsers();
            // clear input value
            setUserId('-1');
        }
    }
    const showCloseModal2 = (show) => {
        setShow(show);
    }

    useEffect(() => {
        if (isLoginedUser()){
            if (getLoginedUserName() === "admin"){
                getUsers();
            }else{
                alert("You can't view users page");
                window.location.href = '/';
                // setTimeout(()=>{
                //     window.location.href = '/';
                // }, 5000);
            }
            
        }else{
            window.location.href = '/';
            alert('You must be logged in to search users')
        }
        
    }, []);
    return (
        <div >
            <Header mode="user"/>
            <div className="container mt-3">
                <div className='row'>
                    <div className='col-6'>
                        <input 
                            className='w-100 p-2'
                            placeholder="Search"
                            onChange={(e)=>{
                                searchUser(e.target.value);
                            }}
                            required={true}
                        />
                    </div>

                    <div className='col-6 text-right'>
                        <button 
                            className='btn btn-primary lift ms-auto bg-warning text-dark'
                            style={{borderColor: '#000000'}}
                            // triggered addMovie function when user click this button.
                            onClick={()=>{
                                showCloseModal2(true);
                            }}
                            
                        >Delete a user</button>
                    </div>
                </div>
                <div className='row'>
                    {filteredUsers.map((item, k) => 
                        <div className='col-12 col-md-4 mt-3' key={k}>
                            
                            <div className='card p-3 shadow' style={{backgroundColor: '#808000', borderColor: '#000000'}}>
                                
                                <label className='font-weight-bold'> UserName: {item.username}</label>
                                <label> Full Name: {item.firstName} {item.lastName}</label>
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className=''>Email: {item.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal show={show} 
                onHide={()=>{
                    showCloseModal2(false)
                }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 mt-2'>
                        <select
                            className='form-control'
                            onChange={(e)=>{
                                setUserId(e.target.value);
                            }}
                        >
                            <option value="-1">Please select user from the list</option>
                            {filteredUsers.filter((item) => item.username !== "admin").map((item, k) => 
                                <option value={item.id}>{item.username}</option>
                            )}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn btn-secondary" 
                        onClick={()=>{
                            showCloseModal2(false)
                        }}
                    >
                    Close
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={()=>{
                            Deleteuser()
                        }}
                    >
                    Delete
                    </button>
                </Modal.Footer>
            </Modal>
    
        </div>
    );
}

export default Users;
