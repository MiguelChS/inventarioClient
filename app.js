/**
 * Created by mc185249 on 1/11/2017.
 */
const express = require("express");
const app = new express();
const port = process.env.PORT || 3000;

app.use(express.static("./src/public"));

app.get('/inventario', function(req, res) {
    res.sendFile(__dirname + '/src/public/index.html');
});

app.listen(port, (err)=>{

    if (err) {
        console.error(err)
    } else {
        console.info("==> Listening on port %s. Open up http://localhost:%s/inventario in your browser.", port, port);
}
});
