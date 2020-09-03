const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-blr-2020.firebaseio.com",
});

exports.hello = functions.https.onRequest(async (req, res) => {
  res.send("Hello World");
});

exports.approve = functions.https.onCall(async (data, context) => {
  try {
    console.log(context.auth);
    if (context.auth.uid) {
      const todo = await admin
        .firestore()
        .collection("todos")
        .doc(data.todoId)
        .get();
      if (todo.data().approver.uid === context.auth.uid) {
        admin.firestore().collection("todos").doc(data.todoId).update({
          isApproved: true,
        });
        fetch(
          "https://hooks.slack.com/services/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",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              text: `\`\`\`${todo.data().text}\`\`\` was *approved* by _${
                context.user.displayName
              }_`,
            }),
          }
        );
      } else {
        throw new functions.https.HttpsError(
          "permission-denied",
          "User not qualified"
        );
      }
    }
  } catch (e) {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User not logged in"
      );
    } else {
      throw e;
    }
  }
});

exports.addApprover = functions.firestore
  .document("todos/{todoId}")
  .onCreate(async (snap) => {
    const allUsersList = await admin.auth().listUsers();
    const allUsers = allUsersList.users;
    snap.ref.update({
      approver: {
        uid: randomUser.uid,
        displayName: randomUser.displayName,
        photoURL: randomUser.photoURL,
      },
    });
  });
const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
