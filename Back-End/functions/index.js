const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
var admin = require("firebase-admin");
var serviceAccount = require("./pre.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const app = express()
app.use(cors({ origin: true }))
const db = admin.firestore();
// UPDATE
app.put("/ubdate/:id", (req, res) => {
    (async() => {
        try {
            const document = db.collection("views").doc(req.params.id);
            const oldNumber = await document.get()
            const oldNumberData = oldNumber.data()
            const realOld = oldNumberData.numberOfViews
            await document.update({
                numberOfViews: realOld + 1,
            });
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    })();
});
// Export api to firebase cloud function 
exports.app = functions.https.onRequest(app)