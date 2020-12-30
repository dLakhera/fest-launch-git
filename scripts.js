var preloader;
var contentDiv;
function preload(opacity) {
    if (opacity <= 0) {
        preloader.style.opacity = 0;
        preloader.style.display = 'none';
        contentDiv.style.opacity = 1;
        
    }
    else {
        preloader.style.opacity = opacity;
        contentDiv.style.opacity = 1 - opacity;
        window.setTimeout(function () { preload(opacity - 0.05) }, 100);
    }
}

var LoadDone = false;
var isLoaderRemoved = false;

async function removeLoader() {
    if (LoadDone === false) {//we want it to match
         setTimeout(removeLoader, 50);//wait 50 millisecnds then recheck
    //    await new Promise(r => setTimeout(r, 2000));
        return;
    }   
    preload(1);
}

document.addEventListener("DOMContentLoaded", function () {
    LoadDone = true;
});

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

var loadTime = 3;//time in seconds
sleep(loadTime*1000).then(() => {
    preloader = document.getElementById("preloader")
    contentDiv = document.getElementById("contentDiv");
    removeLoader();
});



var outh, element, registerBtn;


// var gCal = document.getElementById('gCalLink');

// var description = "This is the fest that we are so excited about!";
// var lc = "abhyuday iit bombay, mumbai";
// var linkText = "Set a reminder";

// $.ajax({
//     url: "gCalLink.php",
//     type: "POST",
//     dataType: "json",
//     data: {
//         fName: "addToGcal",
//         args: ["Abhyuday Social Fest 2k20",
//             "2021-01-23",
//             "2021-01-24",
//             description,
//             lc,
//             true,
//             linkText,
//             "",
//             "reminder",
//         ],
//     },
//     success: function (response) {
//         gCal.innerHTML = response.result;
//         console.log(response.result);
//     }
// })


// element.addEventListener('click', function () {
function signInButtonClicked() {
    gapi.load('auth2', function () {
        console.log("we are in gapoi.load");
        auth2 = gapi.auth2.init({
            client_id: '27410510832-ufn6qu17hi64gchsjtjkmdu0haq0of7r.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile'
        });

        console.log("button clicked");
        auth2.signIn().then(() => {
            var profile = auth2.currentUser.get().getBasicProfile();

            // var profid = profile.getId();
            console.log("ID:" + profile.getId()); // Don't send this directly to your server!
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log("Image URL:" + profile.getImageUrl());
            console.log("Email:" + profile.getEmail());

            outh = profile.getId();


            //Store the entity object in sessionStorage where it will be accessible from all pages of your site.
            sessionStorage.setItem('Outh', profile.getId());
            sessionStorage.setItem('Name', profile.getName());

            var data_sent = "outhsub=" + profile.getId() + "&login=1" + "&name=" + profile.getName() + "&email=" + profile.getEmail() + "&pictureUrl=" + profile.getImageUrl();


//            var xhr = new XMLHttpRequest();
  //          xhr.open('POST', './server.php');
            //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //xhr.send(data_sent);

            // sessionStorage.setItem("outh",profile.getId())

            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState == 4 && xhr.status == 200) {
            //         var myArr = JSON.parse(xhr.responseText);
            //         // myFunction(myArr);
            //         console.log(myarr);
            //     }
            // }

	    $.ajax({
		url:"server.php",
		type:"POST",
		data: {
			outhsub:profile.getId(),
			pictureUrl:profile.getImageUrl(),
			name:profile.getName(),
			email:profile.getEmail(),
			login:"1",
		},
		success: function(response){
		}
	    });

            element.style.display = 'none';
            registerBtn.style.display = 'block';


        }).catch((error) => {
            console.error('Google Sign Up or Login Error: ', error)
        });
    });
}

function onSignOut() {
    gapi.auth2.getAuthInstance().signOut().then(function () {
        console.log("User Signed out");
        element.style.display = 'block';
        registerBtn.style.display = 'none';
        document.location.reload();
    })
}

function reminderClicked() {
    var xhr = new XMLHttpRequest();
    var data = "clicked=1&outh=" + sessionStorage.getItem("Outh");

    xhr.open('POST', './server.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);

    sessionStorage.setItem("reminderSet","set");

    registerBtn.innerHTML = "Reminder Set!";
    registerBtn.style.backgroundColor = 'darkslategrey';
    registerBtn.style.boxShadow = '0 5px 0 #020e1bc4';
    //registerBtn.disabled = true;
    registerBtn.preventDefault();
}

function sessionCheck() {
    element = document.getElementById('googleSignIn');
    registerBtn = document.getElementById('reminder');
    if (sessionStorage.getItem('Name') == null) {
        element.style.display = 'block';
        registerBtn.style.display = 'none';
    } else {
        //User already logged in
        if(sessionStorage.getItem("reminderSet") == null){
            element.style.display = 'none';
            registerBtn.style.display = 'block';
        }
        else {
            element.style.display = 'none';
            registerBtn.style.display = 'block';
            registerBtn.innerHTML = "Reminder Set!";
            registerBtn.style.backgroundColor = 'darkslategrey';
            registerBtn.style.boxShadow = '0 5px 0 #020e1bc4';
        }
    }
}
