app.openDatabase = function () {
    if (!this.checkSimulator()) {
        db = window.sqlitePlugin.openDatabase(
            // options
            {
                name: "progress.db",
                location: 1 // for iOS, see the doc for details for copying in documents sub directory
            },
            // success callback
            function (msg) {
                //alert("success: " + JSON.stringify(msg));
            },
            // error callback
            function (msg) {
                //alert("error: " + msg);
            }
        );
    }
};

app.dropTable = function (table_name) {
    //alert(table_name);
    if (!this.checkSimulator()) {
        if (this.checkOpenedDatabase()) {
            db.transaction(function (tx) {
                tx.executeSql(
                    'DROP TABLE ' + table_name, [],
                    function (tx, res) {
                        //alert('Table deleted');
                    },
                    // note: gets called when deleting table without having inserted rows,
                    //       to avoid this error use: 'DROP TABLE IF EXISTS test'
                    function (tx, res) {
                        //alert('error: ' + res.message);
                    }
                );
            });
        }
    }
};

app.insertRecord = function (table_name) {
    if (!this.checkSimulator()) {
        if (this.checkOpenedDatabase()) {
            db.transaction(function (tx) {
                if (table_name == 'log') {
                    var w = candidateDate;
                    var x = email;
                    var y = candidateName;
                    var z = profile_id;
                    tx.executeSql("CREATE TABLE IF NOT EXISTS log (email text ,name text,profile_id text,date Date, log_value integer)");
                    tx.executeSql(
                        "INSERT INTO log (email,name,profile_id,date,log_value) VALUES (?,?,?,?,?)", [x, y, z, w, 1],
                        function (tx, res) {
                            //alert("insertId: ");
                        },
                        function (tx, res) {
                            alert('error: ' + res.message);
                        });
                } else if (table_name == 'schedule') {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS schedule (Round_Name text ,Interviewer text,Start_Time text, End_Time text)");

                    for (var i in app.employee) {

                        tx.executeSql(
                            "INSERT INTO schedule (Round_Name,Interviewer,Start_Time,End_Time) VALUES (?,?,?,?)", [app.employee[i].Round_Name, app.employee[i].Interviewer, app.employee[i].Start_Time, app.employee[i].End_Time],
                            function (tx, res) {

                                //alert(JSON.stringify(res));
                            },
                            function (tx, res) {
                                alert('error: ' + res.message);
                            });
                    }
                } else if (table_name == 'beacon') {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS beacon (DeviceDescription text ,Tag1 text unique,Content_Type1 text, Content text)");
                    for (var i in app.beaconRegions) {
                        tx.executeSql(
                            "INSERT INTO beacon (DeviceDescription,Tag1,Content_Type1,Content) VALUES (?,?,?,?)", [app.beaconRegions[i].DeviceDescription, app.beaconRegions[i].Tag1, app.beaconRegions[i].Content_Type1, app.beaconRegions[i].Content],
                            function (tx, res) {
                                //alert(JSON.stringify(app.beaconRegions[i]));
                                
                            },
                            function (tx, res) {
                                alert('error: ' + res.message);
                            });
                    }
                     app.startScanForBeacons();
                }


            });
        }
    }
};
app.readRecords = function (table_name) {
    // alert(table_name);
    if (!this.checkSimulator()) {
        if (this.checkOpenedDatabase()) {
            db.transaction(function (tx) {
                tx.executeSql(
                    "select * from " + table_name + ";", [],
                    function (tx, res) {
                        if (table_name == 'log') {
                            //alert(table_name + "		" + res.rows.length);
                            for (var i = 0; i < res.rows.length; i++) {
                                var row = res.rows.item(i);
                                log_details.push(res.rows.item(i));
                            }
                            candidateName = log_details[0].name;
                            interview_date = log_details[0].date;
                            //alert(interview_date);
                            dataBaseFunction();
                            profile_id = log_details[0].profile_id;
                            myfun();
                            document.getElementById('login').style.display = 'none';
                            profileDisplay2();
                        } else if (table_name == 'schedule') {
                            //alert(table_name + "		" + res.rows.length);
                            for (var i = 0; i < res.rows.length; i++) {
                                app.employee[i] = res.rows.item(i);
                                //alert(i + "		" + JSON.stringify(res.rows.item(i)));
                            }
                            var max = app.employee[0].End_Time;

                            max = max.split(" ");
                            for (var i = 1; i < app.employee.length; i++) {
                                var time = app.employee[i].End_Time;

                                time = time.split(" ");
                                if (time[1] >= max[1]) {

                                    max[1] = time[1];
                                    if (time[0] > max[0])
                                        max[0] = time[0];

                                }



                            }
                            greatestTime=max;
                            //alert(greatestTime);

                        } else if (table_name == 'beacon') {
                            //alert(table_name + "		" + res.rows.length);
                            for (var i = 0; i < res.rows.length; i++) {
                                app.beaconRegions[i] = res.rows.item(i);
                               
                            }
                            ///alert(JSON.stringify(app.beaconRegions))
                            app.startScanForBeacons();
                        }

                    },
                    function (tx, res) {
                        //alert('error: ' + res.message);
                    });
            });
        }
    }
};
app.countRecords = function () {

    if (!this.checkSimulator()) {
        if (this.checkOpenedDatabase()) {

            db.transaction(function (tx) {
                tx.executeSql(
                    "select count(*) as cnt from log;", [],
                    function (tx, res) {
                        //alert("count records");
                        log_count = res.rows.item(0).cnt;
                        //alert(log_count);
                        if (log_count == 1) {
                            //alert(log_count);
                            app.readRecords('log');
                            app.readRecords('schedule');
                            app.readRecords('beacon');
                            

                        }


                    },
                    function (tx, res) {
                        //alert('error: ' + res.message);
                        //app.insertRecord2();
                    });
            });
        }
    }
};

app.checkOpenedDatabase = function () {
        if (db == null) {
            // wrapping in a timeout so the button doesn't stay in 'pressed' state
            setTimeout(function () {
                //alert("open the database first");
            });
            return false;
        }
        return true;
    },

    app.checkSimulator = function () {
        if (window.navigator.simulator === true) {
            //alert('This plugin is not available in the simulator.');
            return true;
        } else if (window.sqlitePlugin === undefined) {
            //alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
            return true;
        } else {
            return false;
        }
    };

function dis() {

    for (var i in app.employee) {
        count_dis = 1;
        var node = document.createElement("li");
        node.setAttribute("class", "listItem");
        node.setAttribute('id', i);
        node.setAttribute('onclick', 'show(this.id)');
        var text = app.employee[i].Round_Name;
        var textnode = document.createTextNode(text);
        //textNode.setAttribute("class", "textItem");
        node.appendChild(textnode);
        document.getElementById("employee_list").appendChild(node);

        var node2 = document.createElement('div');
        node2.setAttribute("class", "arrow");
        node2.setAttribute('id', 'arrow' + i);
        var text1 = '\u276f';
        var textnode1 = document.createTextNode(text1);
        node2.appendChild(textnode1);
        document.getElementById(i).appendChild(node2);

        var node3 = document.createElement('div');
        node3.setAttribute("class", "time");
        var text3 = app.employee[i].Start_Time + "-" + app.employee[i].End_Time;
        var textnode3 = document.createTextNode(text3);
        node3.appendChild(textnode3);
        document.getElementById(i).appendChild(node3);

        var div = document.createElement("div");
        div.setAttribute("class", "divItem");
        div.setAttribute('id', 'div' + i);
        /* var img = document.createElement('img');
         img.setAttribute("class", "imgItem");
         img.setAttribute('src', emp[i].image);
         div.appendChild(img);*/
        var name = document.createElement("div");
        name.setAttribute('id', 'name');
        var text2 = app.employee[i].Interviewer;
        var textnode2 = document.createTextNode(text2);
        name.appendChild(textnode2);
        div.appendChild(name);
        document.getElementById("employee_list").appendChild(div);
        if (i == app.employee.length - 1) {
            clearInterval(my);
        }
    }

}
var my = setInterval('dis()', 1000);

function show(id) {
    var x = 'div' + id;
    //alert("emp.length");
    for (i in app.employee) {
        if (x == 'div' + i) {
            //alert(x + "   " + i);
            if (document.getElementById('div' + i).style.display == 'block') {
                var arrow = document.getElementById('arrow' + i);
                arrow.setAttribute('class', 'arrow');
                document.getElementById('div' + i).style.display = 'none';
            } else {
                document.getElementById('div' + i).style.display = 'block';
                var arrow = document.getElementById('arrow' + i);
                arrow.setAttribute('class', 'arrow2');
            }
        } else {
            //alert(x + "   " + i);
            document.getElementById('div' + i).style.display = 'none';
            var arrow = document.getElementById('arrow' + i);
            arrow.setAttribute('class', 'arrow');
        }
    }
}