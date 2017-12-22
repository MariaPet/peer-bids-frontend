import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
const config = {
    apiKey: "AIzaSyDB6SoRVPOSRye_K-LLGp6Z3cKO4cfSv8U",
    authDomain: "cloudappdevproject.firebaseapp.com",
    databaseURL: "https://cloudappdevproject.firebaseio.com",
    storageBucket: "cloudappdevproject.appspot.com",
};
firebase.initializeApp(config);