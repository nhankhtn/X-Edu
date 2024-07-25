const Course = require("../models/Course");
const User = require("../models/User");
const { mutipleMongooseToObject } = require("../../utils/mongoose");
const { cloudinary } = require("../../configs/db")
// const { registerWithEmailAndPassword, loginWithEmailAndPassword } = require("../../utils/firebase");

class AuthController {
    // [GET] /auth/login
    login(req, res, next) {
        res.render("auth/login", {
            layout: false
        });
    }

    // [GET] /auth/login/email
    loginEmail(req, res, next) {
        res.render("auth/login-email", {
            layout: false
        });
    }

    // [POST] /auth/login/verify
    async loginVerify(req, res, next) {
        try {
            const user = await User.findById(req.body.uid);

            req.session.user = {
                id: user._id,
                username: user.username,
                email: user?.email,
                avatar: user?.avatar,
                role: user.role,
            };
            req.session.save(function (err) {
                if (err) next(err);
                res.redirect("/");
            });
        }
        catch (error) {
            next(error);
        }
    }


    // [GET] /auth/logout
    logout(req, res, next) {
        req.session.user = null;
        req.session.save(function (err) {
            if (err) next(err);
            req.session.regenerate(function (err) {
                if (err) next(err);
                res.redirect("/");
            });
        });
    }

    // [GET] /auth/register
    register(req, res, next) {
        res.render("auth/register", {
            layout: false
        });
    }
    registerEmail(req, res, next) {
        res.render("auth/register-email", {
            layout: false
        });
    }

    // [POST] /auth/register/email/store
    async registerEmailStore(req, res, next) {
        try {
            const user = new User({
                _id: req.body.uid,
                username: req.body.username,
                email: req.body.email,
                provider: "email",
            });
            await user.save();
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            };
            await req.session.save();
            res.redirect("/");
        } catch (error) {
            next(error);
        }
    }

    // [POST] /auth/register/google/store
    async registerGoogleStore(req, res, next) {
        try {
            let user = User.findById(req.body.uid);
            if (!user) {
                user = new User({
                    _id: req.body.uid,
                    username: req.body.username,
                    email: req.body.email,
                    avatar: req.body.avatar,
                    provider: "google",
                });
                await user.save();
            }
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            };
            await req.session.save();
            res.redirect("/");
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AuthController