import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Footer from '../components/Footer';
import { getToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { setUserInfo } from '../features/userSlice';
import '../index.css'

const Home = () => {
  const {access_token} = getToken();
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [ userData, setUserData ] = useState({
      first_name:'',
      last_name:'',
      email: '',
      username: '',
      password:'',
  });

  useEffect(()=>{
    if(data && isSuccess){
        setUserData({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            username: data.username,
            password: data.password,
        })
    }
  }, [data, isSuccess])

  useEffect(()=>{
      if(data && isSuccess){
          dispatch(setUserInfo({
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              username: data.username,
              password: data.password,
          }))
      }
  }, [data, isSuccess])

  return (
    <div>
        <Navbar username={userData.username}/>
        <div className='outer-div'>
            <div className='inner-div'>
                <h1>Blogs</h1>
                <p className='sub-text'>See all posts we have ever written.</p> 
            <Post/>
            </div>   
        </div>
        <Footer/>
    </div>
  )
}

export default Home
