const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mysql=require('mysql2')

const app=express()

app.use(cors())
app.use(bodyParser.json())

const db=mysql.createConnection({
    host:'bveya7ub6inadpzypmnt-mysql.services.clever-cloud.com',
    user:'uxj9miav2qhcufvn',
    password:'1qFK2vQ9Ub876ie2QuD6',
    database:'bveya7ub6inadpzypmnt',
    port:3306
})

db.connect((err) => {
    if (err) {
        console.error('Error in connecting to db')
        process.exit(1)
    }
    console.log('Connected to database')
})

app.post('/submit-form',(req,res) =>{
    const {firstName,lastName,employeeId,email,phone,department,doj,role}=req.body;
    const query="INSERT INTO employeetable (firstName,lastName,employeeId,email,phone,department,dateOfJoining,role) values (?,?,?,?,?,?,?,?)"
    db.query(query,[firstName,lastName,employeeId,email,phone,department,doj,role],(error,result)=>{
        if(error){
            console.log(error)
            res.status(500).json({error:'Failed to save data'});
        }
        console.log(result);
        res.status(200).json({message:'data successfully added'});
    });
});

app.get('/display',(req,res)=>{
    db.query('SELECT * FROM employeetable', (err,results) =>{
        if (err) {
            console.error(err);
            return res.status(500).json({error: err.message});
        }
        console.log(results);
        res.status(200).json(results);
    });
});

app.get('/',(req,res) =>{
    res.status(200).json({message:'data successfully added'});
})


const port=5000
app.listen(port ,()=> {
    console.log(`server running on ${port}`)
})