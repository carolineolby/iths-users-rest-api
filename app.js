const express = require('express')
const Datastore = require('nedb-promise')

const users = new Datastore({filename:'users.db', autoload:true})

const app = express()

app.use( express.json() )


app.get('/users', async (req,res) => {
    const responseJSON = await users.find({})
    res.json({ "responseJSON": responseJSON })

})


app.get('/users/:id', async (req,res) => {
    // await users.findOne({ _id: req.params.id }, function(error, documents){
    //     res.json(documents)
    // })
    const documents = await users.findOne({ _id: req.params.id })
    res.json({ "documents": documents })
})


// app.post('/users', async (req,res) => {
//     const newUser = {    
//         name: {
//             title: req.body.title,
//             first: req.body.first,
//             last: req.body.last, 
//         },        
//         email: req.body.email, 
//         nat: req.body.nat
//     }

//     // await users.insert(newUser, function (err, newDoc) { 
//     //     res.json(newDoc)
        
//     //   });
//     const newUser = await users.insert(newUser)
//     res.json({ "newUser": newUser })
// })

app.patch('/users/:id', async (req,res) => {
    // await users.update( { _id: req.params.id }, { $set: { "name.title": req.body.title, "name.first": req.body.first,  "name.last": req.body.last,  "name.email": req.body.email, "name.nat": req.body.nat } }, function (err, newDoc) { 
    //     res.json(newDoc)
        
    //   });
    const newUser = await users.update( { _id: req.params.id }, { $set: { "name.title": req.body.title, "name.first": req.body.first,  "name.last": req.body.last,  "email": req.body.email, "nat": req.body.nat } })
    res.json({ "newUser": newUser })
      
})

app.delete('/users/:id', async (req,res) => {
    // await users.remove({_id: req.params.id}, function(err, newDoc){
    //     res.json(newDoc)
    // }); 
    const deleteDoc = await users.remove({_id: req.params.id})
    res.json({ "deleteDoc": deleteDoc })
})


function startServer(){
    console.log("Server started")
}
app.listen(8090, startServer)

