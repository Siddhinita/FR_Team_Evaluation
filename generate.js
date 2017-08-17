process.stdin.resume();
process.stdin.setEncoding('utf8');

// your code goes here
//imports dependencies
var fs = require('fs');

var csv=require('csv');

function Students(id,team)
{
	this.id=id;
	this.team=team;
};
//Student holds the contents of the first csv file(id and team no.)
var Student=[];
function Score(id,score)
{
	this.id=id;
	this.score=score;
};
//Scores holds the contents of the first csv file(id and team no.)


var Scores=[];
{
var obj=csv();
obj.from.path("./team.csv").to.array(function (data1)
{
	//copying the contents of the team.csv file to Student
	for(var index=1;index<data1.length;index++)
	{
		Student.push(new Students(data1[index][0],data1[index][1]));

	}

{
var obj=csv();
obj.from.path("./scores.csv").to.array(function (data)
{
    //copying the contents of the scores.csv file to Scores
	for(var index=1;index<data.length;index++)
	{
		Scores.push(new Score(data[index][0],data[index][1]));
	}
	//no_team holds the students without marks
no_team=[];
//completed_teams helps in keeping track of iteration process
var completed_teams=[];
//creates a csv file to store the output(id_no and respective marks)

var stream =fs.createWriteStream("teamScores.csv");
//exits when the process of writing is done
stream.on('finish',function() {
console.log("Done.");
process.exit();
});
stream.once("open",function(fd){
//loop that maps each student to his team membeer and then maps all members of the same team to the highest marks achieved by any of them    
for(var i=0;i<Student.length;i++)
{   
    //holds students belonging to a particular group for each iteration
    var student_count=[];
    //holds marks obtained by all students of a particular group for each iteration 
    var marks=[];
    var count=0;
	for(var j=i+1;j<Student.length;j++)
    {
	
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
		}
    }
		if(count!==0)
		{	
			var num=0;
			for(var m=0;m<completed_teams.length;m++)
			{
				if(Student[i].team==completed_teams[m])
				{
					num++;
				}
			}
            //completed_teams holds the teams which have already been soreted so that there are no double entries
			completed_teams.push(Student[i].team);
			if(num===0)
			{
			var a = Math.max.apply(null, marks);
			for(var n=0;n<count;n++)
			{
				//writes th output to csv file
				content=student_count[n]+","+a+"\n";
				stream.write(content);	
				
			}
			content1=Student[i].id+","+a+"\n";
			//writes the output to csv file
			stream.write(content1);
		    }
		}
		else
		{
			//no_team holds the students that are not part of any team
			var num=0;
			for(var m=0;m<completed_teams.length;m++)
			{
				if(Student[i].team==completed_teams[m])
				{
					num++;
				}
				if(num===0)
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


