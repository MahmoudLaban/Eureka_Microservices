
import Login from '../views/pages/login';
import Home from '../views/pages/home';
import Register from '../views/pages/register';
import MovieDetail from '../views/pages/movieDetail';
import Users from '../views/pages/users';

var indexRoutes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/movie/:id', name: 'MovieDetail', component: MovieDetail },
    { path: '/', name: 'Home', component: Home },
    { path: '/users', name: 'Users', component: Users },
];

export default indexRoutes;