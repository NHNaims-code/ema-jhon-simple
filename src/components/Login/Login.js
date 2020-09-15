import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, handleGoogleSignOut, handleFacebookSignIn, initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const[newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password:'',
    photo: '',
    error: '',
    success: false
  });

  initializeLoginFramework();

  
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res)
      history.replace(from)
    })
  }

  const googleSignOut = () =>{
    handleGoogleSignOut()
    .then(res => {
      setUser(res)
      setLoggedInUser(res)
    })
  }

  const signInWithFB = () =>{
    handleFacebookSignIn()
    .then(res =>{
      setUser(res);
      setLoggedInUser(res);
      history.replace(from)
    })
  }
  const handleBlur = (event) => {
    // console.log(event.target.name, event.target.value);
    let isFormValid = true;
    if(event.target.name === 'email'){
        isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
        const minimumSixDigit = event.target.value.length > 5;
        const isPasswordValided = /\S+\d+/.test(event.target.value);

       isFormValid = minimumSixDigit && isPasswordValided;
    }

    if(isFormValid){
      let newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
  }



  const handleSubmit = (event) => {
      console.log("handleSubmit is clicked");
      if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from)
        })
      }
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          setUser(res);
          setLoggedInUser(res);
          res.email && history.replace(from);
          console.log(res.email);
        })
      }

    event.preventDefault();
  }

 console.log(user.error);


  return (
    <div style={{textAlign: 'center'}}>
      <h5>Error: {user.error}</h5>
      {
        user.isSignedIn?<button onClick={googleSignOut}>Sign Out</button>:<button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={signInWithFB}>Sign In with Facebook</button>
      <h1>Our Own Auth System</h1>
      {
        user.isSignedIn && (
          <div>
            <p>Welcome,{user.name}</p>
            <p>Your Email: {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
        )
      }


     <form onSubmit={handleSubmit}>
       <br/>
      <input type="checkbox" name="newUserCheck" onChange={() => setNewUser(!newUser)}/>
      <label htmlFor="newUserCheck">Create an account</label>
       <br/>
        {
          newUser &&  <input type="text" onBlur={handleBlur} placeholder="Enter your name" name="name"/>
        }
        <br/>
        <input type="text" placeholder="Enter yur email" name="email" onBlur={handleBlur} required/>
        <br/>
        <input type="password" name="password" placeholder="Enter your password" onBlur={handleBlur} required/>
        <br/>
        <input type="submit" value={newUser?"Sign Up": "Sign In"}/>
     </form>
     {
       user.success?<p style={{color: "green"}}>"Your accout {newUser?"created":"loged in"} successfully"</p>:<p style={{color: "red"}}>{user.error}</p>
     }
      </div>
  );
}

export default Login;
