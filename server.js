import express from "express"
import path from "path"
import morgan from 'morgan'
const app = express()
const PORT = process.env.PORT || 3000
app.use(morgan('dev'))
app.use(express.static(path.resolve(__dirname,"src")))

app.all("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./src/index.html"))    
})
const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${server.address().port}`)
})