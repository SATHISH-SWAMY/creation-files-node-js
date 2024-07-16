
const fs =require("fs")
const path = require("path")
const express = require('express');
const app = express();
const port = 8080;


const folderPath="./files"



if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, { recursive: true})
}


app.get("/create-file",respondText)     
app.get("/list-files",respondJson)     

function respondText(req , res){
        const now =new Date();
        const fileName =`${now.toISOString().replace(/:/g,"-")}.txt`;
        const filePath = path.join(folderPath,fileName);
        
        fs.writeFile(filePath, now.toString(), (err) =>{
            if (err) {
                res.writeHead(500,{"content-type" : "text/plain"});
                res.end("server error!");
                return;
            }
            res.writeHead(200, {"content-type" : "text/plain"})
            res.end(`file created :${fileName}`);
        })
    }
    
    function respondJson(req , res){
            fs.readdir(folderPath, (err , files)=>{
                if (err) {
                    res.writeHead(500,{"content-type" : "text/plain"});
                    res.end("server error!");
                    return;
                }
                const txtFilters = files.filter((file)=>path.extname(file)===".txt");
                res.writeHead(200, {"content-type": "application/json"})
                res.end(JSON.stringify(txtFilters))
            })
        }
        app.listen(port,()=>console.log(`server is listening on port ${port}`))