import { auth } from "./config.js";
import { signInWithPopup, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const provider = new GithubAuthProvider();

provider.addScope('repo');

// auth.languageCode = 'it';
auth.useDeviceLanguage();

provider.setCustomParameters({
    'allow_signup': 'false'
});

async function signInWithGithub() {
    try {
        if (auth.currentUser) {
            await signOut(auth);
        }

        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return user;
    } catch (error) {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GithubAuthProvider.credentialFromError(error);
        throw error;
    }
}

export { signInWithGithub };