const express = require('express');
const database = require('./server/db/database')
const app = express();
const port = process.env.PORT || 2000;

const userRouter = require('./server/routes/userRoutes')
const areaRouter = require('./server/routes/areaRoutes')
const eventRouter = require('./server/routes/eventRoutes')
const bookingRouter = require('./server/routes/bookingRoutes')

// Serve only the static files form the dist directory
app.use(express.static('./dist/showbook'));
app.use(express.json())
app.use('/userApi',userRouter)
app.use('/areaApi',areaRouter)
app.use('/eventApi',eventRouter)
app.use('/bookingApi',bookingRouter)

app.get('/*', (req, res) =>
    res.sendFile('index.html',{root:'./dist/showbook/'})
);


// Start the app by listening on the default Heroku port
app.listen(port,()=>{console.log(`app listen on port : ${port}`)});