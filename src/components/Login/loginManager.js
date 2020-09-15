import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
        // console.log(firebase.apps.length);
    }
}

export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: false,
        name: displayName,
        email: email,
        password:'',
        photo: photoURL,
        error: 'test for working',
        success: true,
      }
      return(signedInUser)
    })
    .catch(err => {
      console.log(err.message);
    })
  }


  export const handleGoogleSignOut = () =>{
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
      }
      return signOutUser;
    })
    .catch(err =>{
      console.log(err.message);
    })
  }


  export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      updateUserName(name)
      return newUserInfo;
    })
    .catch(err => {
      const newUserInfo = {}
      newUserInfo.error = err.message;
      newUserInfo.success = false;
      return newUserInfo;
    })
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.success = true;
      // newUserInfo.error = "";
      return newUserInfo;
    })
    .catch(err => {
      const newUserInfo = {}
      newUserInfo.error = err.message;
      // console.log(err);
      newUserInfo.success = false;
      return newUserInfo;
      // return err.message;
      // console.log('sign in error console login');
    })
  }

  const updateUserName = name =>{
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log("displayName updated successfully");
    }).catch(function(error) {
      console.log(error);
    });
  }