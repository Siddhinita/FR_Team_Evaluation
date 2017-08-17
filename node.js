var fs = require('fs');
var csv=require('csv');


function Students(id,team)
{
	this.id=id;
	this.team=team;
};

var Student=[];

function Score(id,score)
{
	this.id=id;
	this.score=score;
};
var Scores=[];

{
var obj=csv();
obj.from.path("./team.csv").to.array(function (data1)
{
	
	for(var index=1;index<data1.length;index++)
	{
		Student.push(new Students(data1[index][0],data1[index][1]));

	}

console.log(Student.length+"1")
	console.log(Student)
	{
	var obj=csv();
obj.from.path("./scores.csv").to.array(function (data)
{
	for(var index=1;index<data.length;index++)
	{
		Scores.push(new Score(data[index][0],data[index][1]));
	}
	no_team=[];
console.log(Student.length+"3")

var completed_teams=[];
var stream=fs.createWriteStream("final.csv");
stream.once("open",function(fd){
for(var i=0;i<Student.length;i++)
{	
var student_count=[]
var marks=[];
var count=0;
	for(var j=i+1;j<Student.length;j++)
{
			//console.log(Student[i].team==Student[j].team);
		if(Student[i].team==Student[j].team)
		{
			count++;
			student_count.push(Student[j].id);

			
			for(var k=0;k<Scores.length;k++)
			{
				if(Student[i].id==Scores[k].id)
				{
					marks.push(Scores[k].score);
				}
				if(Student[j].id==Scores[k].id)
				{
					marks.push(Scores[k].score);
				}
			
			}
					
		}}
		//console.log(count);
		if(count!=0)
		{	console.log("hii")
			var num=0;
			for(var m=0;m<completed_teams.length;m++)
			{
				if(Student[i].team==completed_teams[m])
				{
					num++;
					console.log(num)
					
				}
			}

			completed_teams.push(Student[i].team);
			if(num==0){
			var a = Math.max.apply(null, marks);
			
			for(var n=0;n<count;n++)
			{
				content=student_count[n]+","+a+"\n";
				console.log(content);
				stream.write(content);	
				
			}
			content1=Student[i].id+","+a+"\n";
			console.log(content1+i+"****");
			stream.write(content1);
		
		
		
		}}
		else
		{
			var num=0;
			for(var m=0;m<completed_teams.length;m++)
			{
				if(Student[i].team==completed_teams[m])
				{
					num++;
					
				}
				if(num==0)
				{
					no_team.push(Student[i].id);
				}
			}		
		}
		
		
		
		
		
	



}
stream.end();
});	
	
	
	});
	}
	}

	);
	}
	console.log(Student.length+"2")
	console.log(Student)
	





	
	
	

