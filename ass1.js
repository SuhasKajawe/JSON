var exp = require('express');
var mysql = require('mysql2');
var app= exp();

const con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"suhas",
	database:"knowitdb"
}
)
con.connect(function(err){
	if(!err)
		console.log("connected to db");
	else
		console.log("not connet");
});

	

app.listen(9000, function(){console.log("server sstart")}) 

app.get('/file',function(req,res){
	res.sendFile(__dirname +"/ass2.html");
})


app.use(exp.static('script'));


app.get('/suhas',function(req,res){
	
	var q = "select * from emp where EMPNO= "+ req.query.empno;
	con.query(q,function(err,result){
		if(!err){
			res.write("<div>");
			result.forEach(function(v){
							
				res.write("<p> Emp name : "+v.ENAME+"</p>");
				res.write("<p> Emp Job : "+v.JOB+"</p>");
				res.write("<p> Emp Salary : "+v.SAL+"</p>");
			});
			res.write("</div>");
			res.end();

			
		}
	})
	
})


app.all('/*',function(req,res){
	res.send("welcome");
})


