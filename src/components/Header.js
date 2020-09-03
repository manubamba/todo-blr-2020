import React from "react";

import Button from "@atlaskit/button";
import "./header.css";

import { useAuthState } from "react-firebase-hooks/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Avatar from "@atlaskit/avatar";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export const Header = ({ onLogin, onLogout, onCreateAccount }) => {
  // const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => setAuth(user))

  const [user] = useAuthState(firebase.auth());

  return (
    <header>
      <div className="wrapper">
        <div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                fill="#FFF"
              />
              <path
                d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                fill="#555AB9"
              />
              <path
                d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                fill="#91BAF8"
              />
            </g>
          </svg>
          <h1>BLR Fullstackers</h1>
        </div>
        <div>
          {user ? (
            <>
              <Avatar src={user.photoURL} />
              <Button
                appearance="danger"
                onClick={() => firebase.auth().signOut()}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  user: null,
};
