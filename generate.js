process.stdin.resume();
process.stdin.setEncoding('utf8');

//imports dependencies
var fs = require('fs');

var csv = require('csv');

function studentTeam(id, team) {
    this.id = id;
    this.team = team;
};
//@studentAndTeam stores contents of the first csv file(id and team no.)

var studentAndTeam = [];

function studentScore(id, score) {
    this.id = id;
    this.score = score;
};
//@studentAndScore stores contents of the second csv file(id and score)


var studentAndScore = []; {
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
            studentAndTeam.push(new studentTeam(data1[index][0], data1[index][1]));

        }

        {
            var obj = csv();
            obj.from.path("./test_input/scores.csv").to.array(function(data) {
                /*
                callback function for @obj
                copy the contents of the scores.csv file to @studentAndScore
                first column contains id no.
                second colum contains score.
                */

                for (var index = 1; index < data.length; index++) {
                    studentAndScore.push(new studentScore(data[index][0], data[index][1]));
                }
                //@no_team holds the students without marks
                no_team = [];
                //@completed_teams helps in keeping track of iteration process
                var completed_teams = [];
                //creates a csv file to store the output(id_no and respective marks)

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
                @completed_team holds the teams which have already been soreted so that there are no double entries
                @no_team holds the studentAndTeams that are not part of any team


                */

                stream.once("open", function(fd) {
                    /*loop that maps each @studentAndTeam to his team membeer and then maps all members of 
                  the same team to the highest marks achieved by any of them*/
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
                                    stream.write(content);

                                }
                                content1 = studentAndTeam[i].id + "," + a + "\n";
                                //writes the output to csv file
                                stream.write(content1);
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
                    stream.end();
                });
            });
        }
    });
}

