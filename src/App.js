import React from "react";
import "./App.css";
import { useCollection } from "react-firebase-hooks/firestore";
import ToDoRow from "./components/ToDoRow";
import { Header } from "./components/Header";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/functions";
import "firebase/auth";
import "firebase/firestore";
import CreateTodo from "./components/CreateTodo";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.functions().useFunctionsEmulator("http://localhost:5001");

const App = () => {
  const [todosCollection, loading, error] = useCollection(
    firebase.firestore().collection("todos"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [user, loadingUser] = useAuthState(firebase.auth());

  const handleChangeComplete = (todoId, isComplete) => {
    const ref = firebase.firestore().doc(`todos/${todoId}`);
    ref.update({
      isComplete: isComplete,
    });
  };
  const handleSubmit = (text) => {
    const newTodo = firebase.firestore().collection("todos").doc();
    newTodo.set({
      text,
      author: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    });
  };

  const handleApprove = async (todoId) => {
    try {
      const approve = firebase.functions().httpsCallable("approve");
      approve({
        todoId,
      });
    } catch (e) {}
  };

  if (!user && !loadingUser) {
    return (
      <div className="App">
        <Header />
        <span>Please Login to continue</span>
      </div>
    );
  }

  if (loadingUser) {
    return (
      <div className="App">
        <Header />
        <span>Trying to log you in</span>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading Todos...</span>}
      <CreateTodo onSubmit={handleSubmit} />
      {todosCollection &&
        todosCollection.docs.map((doc) => (
          <ToDoRow
            approver={doc.data().approver}
            currentUser={user}
            onApprove={handleApprove}
            title={doc.data().text}
            id={doc.id}
            key={doc.id}
            onChangeComplete={handleChangeComplete}
            {...doc.data()}
          />
        ))}
    </div>
  );
};

export default App;
