function tick() {
    // alert(temp);
    // document.getElementById('calendar').src=temp;
    for (z in flag_img)
        if (flag_img[z] == 1) {

            if (app && app.mobileApp) {
                app.mobileApp.navigate("components/progressPremises/progressPremises.html");
            }
            document.getElementById('img' + z).src = 'images/' + z + '.png';
            document.getElementById('calendar').src = url_video;
            //  document.getElementById('calendar').src=temp;
            if (z == '0') {
                my_flag_pp = 1;
                back_header_temp = 'video_container';
                document.getElementById("title_video").innerHTML = "Welcome to Incubator Center";
                document.getElementById("title_text").innerHTML = "Warmup for Starup !";
                document.getElementById('video_container').style.display = 'block';
                document.getElementById('first_block').style.display = 'none';
                document.getElementById('second_block').style.display = 'none';
                document.getElementById('discover_txt').style.display = 'none';
                clearInterval(img_counter);


            } else if (z == '1') {
                my_flag_pp = 1;

                back_header_temp = 'video_container';

                document.getElementById("title_video").innerHTML = "Welcome to Fitness Center";
                document.getElementById("title_text").innerHTML = "Stay Fit at Progress!";
                document.getElementById('video_container').style.display = 'block';

                document.getElementById('first_block').style.display = 'none';
                document.getElementById('second_block').style.display = 'none';
                document.getElementById('discover_txt').style.display = 'none';
                clearInterval(img_counter);
                //window.open("components/progressPremises.html");

            } else if (z == '2') {
                my_flag_pp = 1;
                back_header_temp = 'video_container';

                document.getElementById("title_video").innerHTML = "Welcome to Idea Cafe";
                document.getElementById("title_text").innerHTML = "Design. Create. Innovate .";
                document.getElementById('video_container').style.display = 'block';

                document.getElementById('first_block').style.display = 'none';
                document.getElementById('second_block').style.display = 'none';
                document.getElementById('discover_txt').style.display = 'none';
                clearInterval(img_counter);
                //window.open("components/progressPremises/progressPremises.html");
            } else {
                my_flag_pp = 1;

                back_header_temp = 'video_container';

                document.getElementById("title_video").innerHTML = "Welcome to  Cafeteria";
                document.getElementById("title_text").innerHTML = "Grub and Greet!";
                document.getElementById('video_container').style.display = 'block';

                document.getElementById('first_block').style.display = 'none';
                document.getElementById('second_block').style.display = 'none';
                document.getElementById('discover_txt').style.display = 'none';
                clearInterval(img_counter);
                //  window.open("components/progressPremises/progressPremises.html");

            }

        }

}
var stopVideo = function (player) {
    var vidSrc = player.prop('src');
    player.prop('src', ''); // to force it to pause
    player.prop('src', vidSrc);
};

function done() {
    document.getElementById('video_container').style.display = 'none';
    stopVideo($('#calendar'));
    // code for stopping the video to play 
}


function tick_page(x, r) {
    if (x == 0 && r == x) {
        document.getElementById('calendar').src = url_video;
        document.getElementById('idea_room_div').style.display = 'none';
        document.getElementById('idea_room_div_final').style.display = 'block';
        setTimeout(function () {
            document.getElementById('idea_room_div_final').style.display = 'none';
        }, 4000);
        document.getElementById("title_video").innerHTML = "Welcome to Incubator Center";
        document.getElementById("title_text").innerHTML = " Warmup for Starup ! ";
        setTimeout(function () {
            document.getElementById('video_container').style.display = 'block';
        }, 4500);
    } else if (x == 1 && r == x) {

        document.getElementById('calendar').src = url_video;
        document.getElementById('gym_room_div').style.display = 'none';

        document.getElementById('gym_room_div_final').style.display = 'block'
        setTimeout(function () {
            document.getElementById('gym_room_div_final').style.display = 'none';
        }, 4000);
        document.getElementById("title_video").innerHTML = "Welcome to Fitness Center";
        document.getElementById("title_text").innerHTML = "Stay Fit at Progress!";
        setTimeout(function () {
            document.getElementById('video_container').style.display = 'block';
        }, 4500);
    } else if (x == 2 && r == x) {

        document.getElementById('calendar').src = url_video;
        document.getElementById('pantree_room_div').style.display = 'none';


        document.getElementById('pantree_room_div_final').style.display = 'block';

        setTimeout(function () {
            document.getElementById('pantree_room_div_final').style.display = 'none';
        }, 4000);
        document.getElementById("title_video").innerHTML = "Welcome to Idea Cafe";
        document.getElementById("title_text").innerHTML = "Design. Create. Innovate.";
        setTimeout(function () {
            document.getElementById('video_container').style.display = 'block';
        }, 4500);
    } else if (x == 3 && r == x) {
        document.getElementById('calendar').src = url_video;
        document.getElementById('lunch_room_div').style.display = 'none';


        document.getElementById('lunch_room_div_final').style.display = 'block';

        setTimeout(function () {
            document.getElementById('lunch_room_div_final').style.display = 'none';;
        }, 4000);
        document.getElementById("title_video").innerHTML = "Welcome to  Cafeteria";
        document.getElementById("title_text").innerHTML = "Grub and Greet!";
        setTimeout(function () {
            document.getElementById('video_container').style.display = 'block';
        }, 4500);
    }
}


function idea_Room() {
    my_flag_pp = 1;
    back_header_temp = 'idea_room_div';
    id_hint_pno = 0;
    document.getElementById('idea_room_div').style.display = 'block';
    document.getElementById('first_block').style.display = 'none';
    document.getElementById('second_block').style.display = 'none';
    document.getElementById('discover_txt').style.display = 'none';
}

function back(ID) {
    if (my_flag_pp == 1) {
        my_flag_pp = 0;
        document.getElementById(ID).style.display = 'none';
        document.getElementById('first_block').style.display = 'inline';
        document.getElementById('discover_txt').style.display = 'block';
        document.getElementById('second_block').style.display = 'inline';
        done();

    } 
    else {
        if (app && app.mobileApp) {
            app.mobileApp.navigate("components/homeView/view.html");
        }
    }
}

function lunch_Room() {
    my_flag_pp = 1;
    id_hint_pno = 3;
    back_header_temp = 'lunch_room_div';
    document.getElementById('lunch_room_div').style.display = 'block';
    document.getElementById('first_block').style.display = 'none';
    document.getElementById('second_block').style.display = 'none';
    document.getElementById('discover_txt').style.display = 'none';


}

function gym_Room() {
    my_flag_pp = 1;
    id_hint_pno = 1;
    back_header_temp = 'gym_room_div';
    document.getElementById('gym_room_div').style.display = 'block';
    document.getElementById('first_block').style.display = 'none';
    document.getElementById('second_block').style.display = 'none';
    document.getElementById('discover_txt').style.display = 'none';


}

function pantree() {
    my_flag_pp = 1;
    id_hint_pno = 2;
    back_header_temp = 'pantree_room_div';
    document.getElementById('pantree_room_div').style.display = 'block';
    document.getElementById('first_block').style.display = 'none';
    document.getElementById('second_block').style.display = 'none';
    document.getElementById('discover_txt').style.display = 'none';


}

function tp1() {
   // alert("in func");
    window.open("components/progressPremises/progressPremises.html");
   // alert("fsdmnxv");
}

function tp2() {
    document.getElementById('calendar').src = url_video;
}

function debug() {
    document.getElementById('video_container').style.display = 'block';
}