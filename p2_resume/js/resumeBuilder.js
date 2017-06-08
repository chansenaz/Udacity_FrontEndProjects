var bio = {
    "name": "Christopher Hansen",
    "role": "Future Data Scientist",
    "contacts": {
        "mobile": "623-824-3370",
        "email": "chansen2@asu.edu",
        "url": "www.chansenaz.com",
        "github": "chansenaz",
        "location": "Tempe, Arizona"
    },
    "welcomeMessage": "Hi! Welcome to my résumé!",
    "biopic": "https://s-media-cache-ak0.pinimg.com/originals/b1/8a/e0/b18ae054a12e2baa470bbcf20ceeb54d.jpg",
    "skills": [
        "Databases", "Programming", "Digital Terrain Models", "Machine Learning", "Magic"
    ]
};

var education = {
    "schools": [{
        "name": "Arizona State University",
        "location": "Tempe, Arizona",
        "degree": "Bachelor of Science",
        "dates": "2010",
        "url": "http://www.asu.edu",
        "majors": [
            "Civil Engineering"
        ]
    }, {
        "name": "Arizona State University",
        "location": "Tempe, Arizona",
        "degree": "Masters",
        "dates": "Expected 2019",
        "url": "http://www.asu.edu",
        "majors": [
            "Computer Science"
        ]
    }],
    "onlineCourses": [{
        "title": "Front End Development Nanodegree",
        "school": "Udacity",
        "dates": "2016",
        "url": "https://www.udacity.com/"
    }]
};

var work = {
    "jobs": [{
        "employer": "Arizona State University - Lunar Reconnaissance Orbiter Camera",
        "title": "Research Technician",
        "location": "Tempe, Arizona",
        "dates": "Oct. 2015 - Present",
        "description": "<p>Worked on cool</p> <p>moon code and stuff.</p>"
    }, {
        "employer": "Alpha Geotechnical and Materials, Inc.",
        "title": "Project Manager, Lab Manager, Engineering Technician",
        "location": "Tempe, Arizona",
        "dates": "Feb. 2012 - Oct. 2015",
        "description": "Managed geotechnical engineering projects."
    }]
};

var projects = {
    "projects": [{
        "title": "Sample Project 1",
        "dates": "2016",
        "description": "This is an example project description. Python, postgres, html, css, javascript. Queso, cheddar, mozzarella, American, provolone, swiss, ricotta, parmesan, feta.",
        "images": [
            "images/197x148_1.gif",
            "images/197x148_2.gif"
        ]
    }, {
        "title": "Sample Project 2",
        "dates": "2016",
        "description": "This is a second example project description. Python, postgres, html, css, javascript. Queso, cheddar, mozzarella, American, provolone, swiss, ricotta, parmesan, feta.",
        "images": [
            "images/197x148_1.gif",
            "images/197x148_2.gif"
        ]
    }]
}




bio.display = function(){
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    $("#header").prepend(formattedName, formattedRole);

    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    $("#topContacts, #footerContacts").append(formattedMobile);

    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    $("#topContacts, #footerContacts").append(formattedEmail);

    var formattedURL = HTMLpersonalURL.replace("%data%", bio.contacts.url);
    $("#topContacts, #footerContacts").append(formattedURL);

    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    $("#topContacts, #footerContacts").append(formattedGithub);

    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    $("#topContacts, #footerContacts").append(formattedLocation);

    var formattedwelcomeMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").append(formattedwelcomeMessage);

    var formattedImage = HTMLbioPic.replace("%data%", bio.biopic);
    $("#header").append(formattedImage);

    $("#header").append(HTMLskillsStart);
    for (var i = 0, length = bio.skills.length; i < length; i++) {
        var formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
        $("#skills").append(formattedSkill);
    }
};
bio.display();





work.display = function() {
    //for (job in work.jobs) {
    for (var i = 0, length = work.jobs.length; i < length; i++) {
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
        var formattedEmployerTitle = formattedEmployer + formattedTitle;
        $(".work-entry:last").append(formattedEmployerTitle);

        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
        $(".work-entry:last").append(formattedLocation);

        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
        $(".work-entry:last").append(formattedDates);

        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);
        $(".work-entry:last").append(formattedDescription);
    }
};
work.display();





projects.display = function() {
    for (var i = 0, length = projects.projects.length; i < length; i++) {
        $("#projects").append(HTMLprojectStart);

        var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
        $(".project-entry:last").append(formattedTitle);

        var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
        $(".project-entry:last").append(formattedDates);

        var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
        $(".project-entry:last").append(formattedDescription);

        if (projects.projects[i].images.length > 0) {
            //for (var image in projects.projects[i].images) {
            for (var j = 0, imagesLength = projects.projects[i].images.length; j < imagesLength; j++) {
                var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[i].images[j]);
                $(".project-entry:last").append(formattedImage);
            }
        }
    }
};
projects.display();





education.display = function() {
    for (var i = 0, length = education.schools.length; i < length; i++) {
        $("#education").append(HTMLschoolStart);

        var formattedName = HTMLschoolName.replace("%data%", education.schools[i].name);
        var formattedNameURL = formattedName.replace("%url%", education.schools[i].url);
        var formattedDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[i].location);
        var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[i].majors);
        var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);

        $(".education-entry:last").append(formattedNameURL);
        $(".education-entry:last").append(formattedDegree);
        $(".education-entry:last").append(formattedDates);
        $(".education-entry:last").append(formattedLocation);
        $(".education-entry:last").append(formattedMajor);
    }

    $("#education").append(HTMLonlineClasses);

    for (var i = 0, length = education.onlineCourses.length; i < length; i++) {
        $("#education").append(HTMLschoolStart);
        var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[i].title);
        $(".education-entry:last").append(formattedTitle);
        var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[i].school);
        $(".education-entry:last").append(formattedSchool);
        var formattedDate = HTMLonlineDates.replace("%data%", education.onlineCourses[i].dates);
        $(".education-entry:last").append(formattedDate);
        var formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourses[i].url);
        var formattedURL2 = formattedURL.replace("%url%", education.onlineCourses[i].url);
        $(".education-entry:last").append(formattedURL2);
    }

};
education.display();









//logs click locations
$(document).click(function(loc) {
    var x = loc.pageX;
    var y = loc.pageY;

    logClicks(x, y);
});


function locationizer(work_obj) {
    var locationArray = [];

    for (job in work_obj.jobs) {
        var newLocation = work_obj.jobs[job].location;
        locationArray.push(newLocation);
    }

    return locationArray;
};


function inName(name) {
    name = name.trim().split(" ");
    console.log(name);
    name[1] = name[1].toUpperCase();
    name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1).toLowerCase();

    return name[0] + " " + name[1];
};

//internationalizeButton = inName(bio.name);
//$("#main").append(internationalizeButton);

$("#mapDiv").append(googleMap);
