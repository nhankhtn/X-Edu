const mongoose = require("mongoose");
var MongoDBStore = require("connect-mongodb-session");

const URL_MONGODB = "mongodb://localhost:27017/x-edu";

async function connect() {
    try {
        await mongoose.connect(URL_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connect database successfully!!!");
    } catch (error) {
        console.log("Connect database failure!!!");
    }
}

function createSessionStore(session) {
    const mongoStore = MongoDBStore(session);
    const store = new mongoStore(
        {
            uri: URL_MONGODB,
            collection: "sessions",
        },
        function (error) {
            if (error) {
                console.log(error);
            }
        }
    );

    store.on("error", function (error) {
        console.log("Session store error:", error);
    });

    return store;
}


module.exports = { connect, createSessionStore };
