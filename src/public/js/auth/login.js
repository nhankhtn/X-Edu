import { loginWithEmailAndPassword, signInWithGoogle, signInWithFacebook } from "./firebase/index.js";

document.addEventListener("DOMContentLoaded", function () {
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
        const email = $("#email").val();
        const password = $("#password").val();

        if (email === "" || password === "") {
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
            const user = await loginWithEmailAndPassword(email, password);

            await fetch("/auth/login/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid
                }),
            });
            window.parent.postMessage({
                type: "login-success",
            }, "*");
        } catch (error) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                $(".message-warning").text("Email or password is incorrect");
            } else {
                $(".message-warning").text("An error occurred, please try again later");
            }
        }

    })
})

document.addEventListener("DOMContentLoaded", function () {
    $(".btn-login-google").on("click", async function () {
        try {
            const user = await signInWithGoogle();
            await fetch("/auth/login/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid
                }),
            });
            window.parent.postMessage({
                type: "login-success",
            }, "*");
        } catch (error) {
            console.error(error);
        }
    })
})
document.addEventListener("DOMContentLoaded", function () {
    $(".btn-login-facebook").on("click", async function () {
        try {
            const user = await signInWithFacebook();
            await fetch("/auth/login/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid
                }),
            });
            window.parent.postMessage({
                type: "login-success",
            }, "*");
        } catch (error) {
            console.error(error);
        }
    })
})