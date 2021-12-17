import { useState, useEffect } from 'react';
import axiosInstance from '../../api';
import { getLoginedId, isLoginedUser } from '../../auth';

import Header from '../components/header';
import {withRouter} from 'react-router';
import { Rating, RatingView  } from 'react-simple-star-rating'

function MovieDetail(props) {
    const [movieDetail, setMovieDetail] = useState({});
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [btnAddReviewText, setBtnAddReviewText] = useState('Add a Review');
    const movie_id = props.match.params.id;
    const [selReviewId, setSelReviewId] = useState(-1);
    const [avgRating, setAvgRating] = useState(0.0);
    
    const getMovieDetail = async (id) => {
        const movieDetail = await axiosInstance.get(`Movie/${id}`);
        const reviews = await axiosInstance.get(`Review/${id}`);
        console.log(reviews);
        setMovieDetail(movieDetail.data);
        setReviews(reviews.data);
        let sumRating = 0;
        reviews.data.forEach(element => {
            sumRating += element.rating;
        });
        setAvgRating(sumRating/reviews.data.length);
    }

    const addReview = async () => {
        console.log('aaaa');
        if (isLoginedUser()){
            if (selReviewId === -1) {
                // add new review, 
                await axiosInstance.post(`Review`, {
                    user_id: getLoginedId(),
                    movie_id: parseInt(movie_id),
                    review_text: reviewText,
                    rating: rating
                });
            }else{
                // update a review
                await axiosInstance.put(`Review/${selReviewId}`, {
                    review_text: reviewText,
                    rating: rating
                });
            }
            
            setReviewText('');
            setSelReviewId(-1);
            setRating(0);
            setBtnAddReviewText('Add a review');
            getMovieDetail(movie_id);
        }else{
         //   window.location.href = '/login';
         alert('You must be logged in to add a review')
        }
    }
    const selectUpdateReview = (id, review_text, rating) => {
        setBtnAddReviewText('Update a Review');
        setReviewText(review_text);
        setSelReviewId(id);
        setRating(rating);
    }
    const deleteReview = async (id) => {
        // delete review
        await axiosInstance.delete(`Review/${id}`);
        getMovieDetail(movie_id);
    }
    const handleRating = (rate) => {
        console.log(rate)
        setRating(rate);
    }
    useEffect(() => {
        var id = props.match.params.id
        getMovieDetail(id);
    }, [props.match.params.id]);

    return (
        <div>
            <Header />
            <div className="container">
                <div className='row'>
                    <div className='col-12'>
                        <a style={{color: '#FFA500'}} href='/'>All Movies</a> / {movieDetail.title}
                    </div>
                    <div className='col-12 mt-2'>
                        <div className='shadow p-4' style={{backgroundColor: '#008080', borderColor: '#000000'}}>
                            <div className='row'>
                                <div className='col-md-3'>Genre: {movieDetail.genre}</div>
                                <div className='col-md-3'>Published At: {movieDetail.year}</div>
                                <div className='col-md-3'>Avg Rating: {avgRating.toFixed(2)}</div>
                                <div className='col-md-3'>Total Reviews: {reviews.length}</div>
                            </div>
                        </div>
                    </div>
                    {reviews && reviews.map((item, k) => 
                        <div className='col-12 mt-3' key={k}>
                            
                            <div className='card p-3 shadow' style={{backgroundColor: '#008080', borderColor: '#000000'}}>
                                <div className='row'>
                                    <div className='col-12 col-md-9'>
                                        <span className=''>{item.review_text}</span>
                                    </div>
                                    <div className='col-12 col-md-3 text-right'>
                                        {item.user_id.toString() === getLoginedId() ? 
                                            <div>
                                                <button className='btn btn-success btn-sm' onClick={() => selectUpdateReview(item.id, item.review_text, item.rating)}>Update</button>
                                                <button className='btn btn-danger btn-sm ml-2' onClick={() => deleteReview(item.id)}>Delete</button>
                                            </div> 
                                        : ''}
                                        <RatingView ratingValue={ item.rating } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isLoginedUser() && 
                        
                        <div className='col-12 mt-4'>
                            <Rating className="mb-2" onClick={handleRating} ratingValue={rating} />
                            <textarea 
                                className='form-control'
                                placeholder='type your review'
                                value={reviewText}
                                onChange={(e)=>{
                                    setReviewText(e.target.value);
                                }}>
                            </textarea>
                        </div>
                    
                    }
                    <div className='col-12 mt-2'>
                        <button className='btn btn-primary lift ms-auto bg-warning text-dark' style={{borderColor: '#000000'}} onClick={() => addReview()}>{btnAddReviewText}</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )

}

export default withRouter(MovieDetail);