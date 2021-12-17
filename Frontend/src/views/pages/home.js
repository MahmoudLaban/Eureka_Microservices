import { useState, useEffect } from 'react';
import axiosInstance from '../../api';
import Header from '../components/header';
import { getLoginedUserName, isLoginedUser } from "../../auth";
import { Modal } from 'react-bootstrap';

function Home() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [errTitle, setErrTitle] = useState('');
    const [errYear, setErrYear] = useState('');

    const getMovies = async () => {
        const data = await axiosInstance.get('Movie');
        console.log(data.data);
        setMovies(data.data);
        setFilteredMovies(data.data);
    }
    const searchMovie = (searchText) => {
        setFilteredMovies(movies.filter((item) => item.title.toLowerCase().includes(searchText)))
    }

    // create addMovie function
    const AddMovie = async () => {
        console.log(title, genre, year, getLoginedUserName)
        if (title.length === 0){
            setErrTitle("Please type your title");
            return;
        }
        if (year.length !== 4){
            setErrYear("Please type correct year");
            return;
        }
        if (parseInt(year) > 2021){
            setErrYear("Year can be less than 2021");
            return;
        }
        setShow(false);
        await axiosInstance.post(`Movie`, {
            Title: title,
            Genre: genre,
            Year: parseInt(year)
        });
        // refresh movie list
        getMovies();
        // clear input value
        setTitle('');
        setGenre('');
        setYear('');
        setErrYear('');
        setErrTitle('');
    }
    const showCloseModal = (show) => {
        if (isLoginedUser()){
            setShow(show);
        }else{
            alert('You must be logged in to add a movie')
        }
        
    }

    useEffect(() => {
        getMovies();
    }, []);
    return (
        <div >
            <Header />
            <div className="container mt-3">
                <div className='row'>
                    <div className='col-6'>
                        <input 
                            className='w-100 p-2'
                            placeholder="Search"
                            onChange={(e)=>{
                                searchMovie(e.target.value);
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
                                showCloseModal(true)
                            }}
                            
                        >Add a Movie</button>
                    </div>
                </div>
                <div className='row'>
                    {filteredMovies.map((item, k) => 
                        <div className='col-12 col-md-3 mt-3' key={k}>
                            <div className='card shadow bg-info' style={{borderColor: '#000000'}}>
                                <div className="card-header">
                                    <a href={`/movie/${item.id}`}>
                                        <span className='font-weight-bold text-dark' style={{borderColor: '#000000'}}>{item.title}</span>
                                    </a>
                                </div>        
                                <div className="card-body">
                                    <label>{item.genre}</label>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <span className=''>{item.year}</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal show={show} 
                onHide={()=>{
                    showCloseModal(false)
                }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12'>
                        <input 
                            className='form-control'
                            placeholder='Title'
                            value={title}
                            onChange={(e)=>{
                                setTitle(e.target.value);
                            }}
                        />
                        {
                            errTitle.length > 0 && 
                            <label className='text-danger'>{errTitle}</label>
                        }
                    </div>
                    <div className='col-12 mt-2'>
                        <select
                            className='form-control'
                            placeholder='Genre'
                            value={genre}
                            onChange={(e)=>{
                                setGenre(e.target.value);
                            }}
                        >
                            <option value="Action">Action</option>
                            <option value="Horror">Horror</option>
                        </select>
                    </div>
                    <div className='col-12 mt-2'>
                        <input 
                            type='number'
                            className='form-control'
                            placeholder='Year'
                            value={year}
                            onChange={(e)=>{
                                setYear(e.target.value);
                            }}
                        />
                        {
                            errYear.length > 0 && 
                            <label className='text-danger'>{errYear}</label>
                        }
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn btn-secondary" 
                        onClick={()=>{
                            showCloseModal(false)
                        }}
                    >
                    Close
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={()=>{
                            AddMovie()
                       
                        }}
                    >
                    Save
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;
