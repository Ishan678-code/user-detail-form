const express = require("express");
const bodyParser = require("body-parser");
const mysql2=require("mysql2");
const cors = require("cors"); // To handle cross-origin requests
const { generatePDF } = require("./resumegenerator");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors()); // Allow requests from different origins
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(bodyParser.json()); // Parse JSON data

const connection=mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'resumeDB'
})

// Route to handle form submission
app.post("/submit", (req, res) => {
  const formData=req.body;
const {name,address,phone,password,email,school,level,year,company,position,duties,work_year,skills} = req.body;

connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
  if (err) throw err;

  if (results.length > 0) {
    // User already exists
    return res.status(400).json({ message: "User with this email already exists." });
  }
  connection.query('Insert into users(name,email,phone,password,address)values(?,?,?,?,?)',[name,email,phone,password,address],(err,result)=>{
    if(err)
    throw err;
    console.log('user details already entered.')  
    
    })
    connection.query('Insert into education(school,level,year)values(?,?,?)',[school,level,year],(err,result)=>{
      if(err)
      throw err;
      console.log('education details already entered.')  
      
      })
      connection.query('Insert into experience(company,position,duties,work_year)values(?,?,?,?)',[company,position,duties,work_year],(err,result)=>{
        if(err)
        throw err;
        console.log('experience details already entered.')  
        
        })
        connection.query('Insert into skills(skill)values(?)',[skills],(err,result)=>{
          if(err)
          throw err;
          console.log('skill details already entered.')  
          
          })

  console.log("Form data received:", formData);

  const data=formData;
  generatePDF(data,res);
  
})
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});