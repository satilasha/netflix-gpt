import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { onAuthStateChanged } from  "firebase/auth";


const Body = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({
          uid,
          email,
          displayName 
        }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []); 

  return (
    <div>
      <Login />
      <Browse />
    </div>
  )
}

export default Body