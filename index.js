const express= require('express');
const Users= require('./MOCK_DATA.json');
const fs= require('fs');
const app= express();
app.use(express.urlencoded({ extended: false }));

//GET Retrive  all users data
app.get('/user',(req,res) =>{
     res.json(Users);
    
});
//GET Retrive Api all users data
app.get('/api/user',(req,res) => {
    const html= 
    `<ul>
        ${Users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`

     res.send(html);
});

// GET shwo with Id
app.get('/api/user/:id',async(req,res) => {
    const id= Number(req.params.id);
    const data = Users.find(data => data.id === id);  
    return res.json(data);  

});

//post
app.post('/api/user',(req,res) =>{
    const body = req.body;
    Users.push({...body ,id: Users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(Users), err=>{
        if(err)
            {
                console.log(err);
            }
        else
        {
            console.log("Succesfully add data into file");
            return res.json({status: "success"});
        }
    });
    
});

// DELETE
app.delete('/api/user/:id',(req,res) => {
    const id = Number(req.params.id);    
    const index = Users.findIndex((index) => index.id === id);    
    if (index !== -1) {
        Users.splice(index, 1);
    }    
    return res.json({status: "Successfully Removed"});
});

//update
app.patch('/api/user/:id', (req,res) =>{
    const id = Number(req.params.id);
    const data = Users.find(user=> user.id ===id);
    if(data)
    {
        data.first_name=req.body.first_name
        data.last_name=req.body.last_name;
        data.email=req.body.email;
        data.gender=req.body.gender;
        res.sendStatus(200);
        res.json(data);
        
    }
    else
    {   
        res.send({Status: "Failed"});
    }

});

app.listen(3000, () =>
{
    console.log("Server Is runing _____");
}
);
