
import {
    registerWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub
} from "./firebase/index.js";


document.addEventListener("DOMContentLoaded", function () {
    // $("#btn-switch-phone").on("click", function () {
    //     $("#register-phone").removeClass("d-none");
    //     $("#register-email").addClass("d-none");
    // });
    // $("#btn-switch-email").on("click", function () {
    //     $("#register-email").removeClass("d-none");
    //     $("#register-phone").addClass("d-none");
    // });
    $(".icon-visible-password").on("click", function () {
        const input = $(this).parent().find("input");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this).removeClass("bi-eye").addClass("bi-eye-slash");
        }
        else {
            input.attr("type", "password");
            $(this).removeClass("bi-eye-slash").addClass("bi-eye");
        }
    });
    $("#btn-submit").on("click", async function () {
        const username = $("#username").val();
        const email = $("#email").val();
        const password = $("#password").val();

        if (username === "" || email === "" || password === "") {
            $(".message-warning").text("Please fill all fields");
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            $(".message-warning").text("Email is invalid");
            return;
        }

        if (password.length < 6) {
            $(".message-warning").text("Password must be at least 6 characters");
            return;
        }
        $(".message-warning").text("");

        try {
            const user = await registerWithEmailAndPassword(email, password);

            await fetch("/auth/register/email/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email,
                    username,
                }),
            });
            window.parent.postMessage({ type: "register-success", }, "*");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                $(".message-warning").text("Email already in use");
            }
            else {
                $(".message-warning").text("Register failed");
            }
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {
    $(".btn-register-google").on("click", async function () {
        try {
            const user = await signInWithGoogle();
            await fetch("/auth/register/google/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName,
                    avatar: user.photoURL,
                }),
            });
            window.parent.postMessage({ type: "register-success", }, "*");
        } catch (error) {
            console.log(error);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    $(".btn-register-facebook").on("click", async function () {
        try {
            const user = await signInWithFacebook();

            await fetch("/auth/register/google/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName,
                    avatar: user.photoURL,
                }),
            });
            window.parent.postMessage({ type: "register-success", }, "*");
        } catch (error) {
            console.log(error);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    $(".btn-register-github").on("click", async function () {
        try {
            const user = await signInWithGithub();
            console.log(user);
            return;

            await fetch("/auth/register/github/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName,
                    avatar: user.photoURL,
                }),
            });
            window.parent.postMessage({ type: "register-success", }, "*");
        } catch (error) {
            console.log(error);
        }
    });
})