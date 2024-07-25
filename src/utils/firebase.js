// const {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     onAuthStateChanged
// } = require("firebase/auth");

// const { auth } = require("../configs/firebase");


// async function registerWithEmailAndPassword(email, password) {
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         console.log(userCredential.user);
//     }
//     catch (err) {
//         const errorCode = err.code;
//         const errorMessage = err.message;
//         console.log(errorCode, errorMessage);
//     }
// }
// async function loginWithEmailAndPassword(email, password) {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         window.parent.postMessage('login-success', '*');
//     }
//     catch (err) {
//         const errorCode = err.code;
//         const errorMessage = err.message;
//         console.log(errorCode, errorMessage);
//         window.parent.postMessage({ type: 'login-fail', message: err.message }, '*');
//     }
// }

// onAuthStateChanged(auth, user => {
//     if (user) {
//         console.log("User is logged in", user.email);
//     }
//     else {
//         console.log("No user");
//     }
// });


// module.exports = {
//     registerWithEmailAndPassword,
//     loginWithEmailAndPassword,
// }