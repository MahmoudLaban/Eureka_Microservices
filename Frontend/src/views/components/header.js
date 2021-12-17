import { isLoginedUser, logout, getLoginedUserName } from "../../auth";

function Header(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#000000'}}>
            <div className="container">
                <a className="navbar-brand" style={{color: '#FFA500'}} href="/">
                    <h2>So Web APP</h2>
                    <span className="text-white">{'Logged in user = ' + getLoginedUserName()}</span>
                </a>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="mr-1" >
                            <button className="btn btn-warning">
                                {
                                    props.mode !== "user" ? 
                                    <a  style={{borderColor: '#000000', color: '#000000'}} href="/users">Search users</a> 
                                    : 
                                    <a  style={{borderColor: '#000000', color: '#000000'}} href="/">Search movies</a>
                                }
                            </button>
                        </li>
                    </ul>
                </div>
                {
                    !isLoginedUser() ? (
                    <a className="navbar-btn btn btn-primary lift ms-auto" href="/login">
                        Login
                    </a> ) : (
                        <div>
                            <button className="navbar-btn btn btn-primary lift ms-auto bg-warning text-dark" style={{borderColor: '#000000', backgroundColor: '#808000'}} onClick={logout}>
                                Logout
                            </button>
                        </div>
                     )
                }
            </div>
        </nav>
    )

}

export default Header;