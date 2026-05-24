import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./configs/mongodb.js"
// App configuration

const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// Middlewares
app.use(express.json())
app.use(cors())

// Api routes
app.get("/", (req, res) => 
  res.send("Hello from the server!" )
)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))