process.stdin.resume();
process.stdin.setEncoding('utf8');


function start() {
try {
 getStudentTeamData();
} catch(err) {
  console.log("Error! Exiting");
  console.exit();
}
  
}
function getStudentTeamData(){
    var obj = csv();
    obj.from.path("./test_input/team.csv").to.array(function(data1) {
        /*
        callback function for @obj
        copy the contents of the team.csv file to @studentAndTeam
        first column contains id no.
        second colum contains team no.
        calls function @readSecondFile
        */

        for (var index = 1; index < data1.length; index++) {
            studentAndTeam.push(new dataModels.team(data1[index][0], data1[index][1]));

        }

        getStudentScoreData()

      });
}
function getStudentScoreData() {

      var obj = csv();
      obj.from.path("./test_input/scores.csv").to.array(function(data) {
          /*
          callback function for @obj
          copy the contents of the scores.csv file to @studentAndScore
          first column contains id no.
          second colum contains score.
          */

          for (var index = 1; index < data.length; index++) {
              studentAndScore.push(new dataModels.score(data[index][0], data[index][1]));
          }

          WriteOuptput(generateOutput());
      });
}

function WriteOuptput(output) {

  var stream = fs.createWriteStream("./test_output/teamScores.csv");
  //exits when the process of writing is done
  stream.on('finish', function() {
      console.log("Done.");
      process.exit();
  });
  /*
  callback function for stream object
  sorts the students according to their score and team and simultaneously
  writes the content to the output csv file using a stream object
  uses @studentAndTeam and @studentAndScore to generate output
  @completed_team holds the teams which have already been sorted so that there are no double entries
  @no_team holds the studentAndTeams that are not part of any team

  */
  stream.on("error",function(err){
    if(fs.existsSync("./test_output/teamScores.csv")||fs.existsSync("./test_output"))
    {
      console.log("Error opening file, does the program has write access?")
      console.exit();

    } else  {
      console.log("Output directory not available. Creating directory.....")
        fs.mkdir("./test_output",function(err){
          if (err) {
            console.log("Error creating directory, does the program has write access?")
            console.exit();

          } else {
            start();
          }
    });
  }
});
  stream.once("open", function(fd) {

      stream.write(output);
      stream.end();
  });

}
function generateOutput() {

      //@no_team holds the students without marks
      no_team = [];
      //@completed_teams helps in keeping track of iteration process
      var completed_teams = [];

      var outputStr = "";
       for (var i = 0; i < studentAndTeam.length; i++) {
           //holds students belonging to a particular group for each iteration
           var studentAndTeam_count = [];
           //holds marks obtained by all students of a particular group for each iteration
           var marks = [];
           var count = 0;
           for (var j = i + 1; j < studentAndTeam.length; j++) {

               if (studentAndTeam[i].team == studentAndTeam[j].team) {
                   count++;
                   studentAndTeam_count.push(studentAndTeam[j].id);
                   for (var k = 0; k < studentAndScore.length; k++) {
                       if (studentAndTeam[i].id == studentAndScore[k].id) {
                           marks.push(studentAndScore[k].score);
                       }
                       if (studentAndTeam[j].id == studentAndScore[k].id) {
                           marks.push(studentAndScore[k].score);
                       }
                   }
               }
           }
           if (count !== 0) {
               var num = 0;
               for (var m = 0; m < completed_teams.length; m++) {
                   if (studentAndTeam[i].team == completed_teams[m]) {
                       num++;
                   }
               }
               //@completed_teams holds the teams which have already been soreted so that there are no double entries
               completed_teams.push(studentAndTeam[i].team);
               if (num === 0) {
                   var a = Math.max.apply(null, marks);
                   for (var n = 0; n < count; n++) {
                       //writes th output to csv file
                       content = studentAndTeam_count[n] + "," + a + "\n";
                       outputStr = outputStr+content;
                       //console.log(outputStr);

                   }
                   content = studentAndTeam[i].id + "," + a + "\n";
                   outputStr = outputStr+content;

                   //writes the output to csv file
                   //console.log(outputStr);
               }
           } else {
               //@no_team holds the students that are not part of any team
               var num = 0;
               for (var m = 0; m < completed_teams.length; m++) {
                   if (studentAndTeam[i].team == completed_teams[m]) {
                       num++;
                   }
                   if (num === 0) {
                       no_team.push(studentAndTeam[i].id);
                   }
               }
           }
       }
       return outputStr;
}

var dataModels = require("./StudentModel.js");
var fs = require('fs');
var csv = require('csv');

//@studentAndTeam stores contents of the first csv file(id and team no.)
var studentAndTeam = [];
//@studentAndScore stores contents of the second csv file(id and score)
var studentAndScore = [];

//calling function to start program execution
 start();
