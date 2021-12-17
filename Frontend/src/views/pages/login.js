import { useState, useEffect  } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import '../../assets/css/login.css';
import axiosInstance from '../../api'
import { isLoginedUser } from '../../auth';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            const data = await axiosInstance.post('Auth/auth-user', {
                username: userName,
                password: password
            });
            
            if(data !== undefined){
                console.log(data)
                setError(false);
                localStorage.setItem('user_id', data.data.id);
                localStorage.setItem('access_token', data.data.token);
                localStorage.setItem('username', data.data.username);
                window.location.href = '/';
            }
            return data;
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        if(isLoginedUser()){
            window.location.href = '/';
        }
    }, []);

    return (
        <div className="container h-100 ">
            <form onSubmit={handleSubmit} className='h-100'>
                <div className='row d-flex h-100 text-center justify-content-center'>
                    <div className="col-md-5 col-12 align-self-center" style={{marginTop: '-150px'}}>
                        <h1>SO Web APP</h1>
                        <div className="login-part">
                            <Row>
                                <Col className="col-12 text-center">
                                    <label >Please enter your log in details</label>
                                </Col>
                                <Col className="col-12 text-center">
                                    {error &&<label className="text-danger">The details you have entered are incorrect</label>}
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col className="col-12">
                                    <input 
                                        className='w-100 p-2'
                                        value={userName}
                                        placeholder="Username"
                                        onChange={(e)=>{
                                            setUserName(e.target.value);
                                        }}
                                        required={true}
                                        
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-12">
                                    <input 
                                        className='w-100 p-2'
                                        value={password}
                                        placeholder="Password"
                                        type="password"
                                        onChange={(e)=>{
                                            setPassword(e.target.value);
                                        }}
                                        required={true}
                                    />
                                </Col>
                            </Row>
                            <div className="row mt-4">
                                <div className="col-12">
                                <Button style={{width:"100%", backgroundColor: '#000000', borderColor: '#000000', color: '#FFA500', fontfamily: 'arial', fontWeight: 'bold'}} type='submit'>Login</Button>
                                </div>
                                <div className="col-12 pt-2 ">
                                    <span>Do you have an account?</span><a className='ml-3 text-warning font-weight-bold' href="/register">Sign Up</a>
                                </div>
                                <div className="col-12 pt-2 ">
                                    <span>Continue without logging in:</span><a className='ml-3 text-warning font-weight-bold' href="/">No Log in</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
