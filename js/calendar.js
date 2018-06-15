---
layout: 'jsfile'
---
$(document).ready(function() {
    $('#calendar').fullCalendar({
        customButtons: {
            day1: {
                text: 'Zaterdag',
                click: function(e) {
                    $(".fc-day2-button").removeClass("fc-state-active");
                    $(".fc-day3-button").removeClass("fc-state-active");
                    $(e.target).addClass("fc-state-active");
                    $('#calendar').fullCalendar('getView');
                    $("#calendar").fullCalendar(
                        'changeView', $('#calendar').fullCalendar('getView').name, '2018-08-18'
                    );
                }
            },
            day2: {
                text: 'Zondag',
                click: function(e) {
                    $(".fc-day1-button").removeClass("fc-state-active");
                    $(".fc-day3-button").removeClass("fc-state-active");
                    $(e.target).addClass("fc-state-active");
                    $('#calendar').fullCalendar('getView');
                    $("#calendar").fullCalendar(
                        'changeView', $('#calendar').fullCalendar('getView').name, '2018-08-19'
                    );
                }
            },
            day3: {
                text: 'Maandag',
                click: function(e) {
                    $(".fc-day1-button").removeClass("fc-state-active");
                    $(".fc-day2-button").removeClass("fc-state-active");
                    $(e.target).addClass("fc-state-active");
                    $('#calendar').fullCalendar('getView');
                    $("#calendar").fullCalendar(
                        'changeView', $('#calendar').fullCalendar('getView').name, '2018-08-20'
                    );
                }
            }
        },
        header: {
            left: 'day1,day2,day3',
            center: 'title',
            right: 'agendaDay listDay'
        },
        allDaySlot: false,
        defaultDate: '2018-08-18',
        defaultView: 'agendaDay',
        minTime: '10:00:00',
        maxTime: '23:00:00',
        locale: 'nl-be',
        height: 'auto',
        groupByResource: true,
        buttonIcons: true, // show the prev/next text
        weekNumbers: false,
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: '{{site.baseurl}}/alltracks.json',
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          resources: [
            { id: 'main-stage', title: 'Main Stage', eventClassName: 'track1', textColor: 'black' },
            { id: 'content', title: 'Content', eventClassName: 'track2', textColor: 'black' },
            { id: 'terrein', title: 'Terrein', eventClassName: 'track3', textColor: 'black' },
            { id: 'berkenhof', title: 'Berkenhof', eventClassName: 'track4', textColor: 'black' },
            { id: 'hardware-hacking-tent', title: 'Hardware Hacking Tent', eventClassName: 'track5', textColor: 'black' },
            { id: 'knutselbaar', title: 'KnutselBaar', eventClassName: 'track6', textColor: 'black' },
            { id: 'hoofdgebouw-refter', title: 'Hoofdgebouw Refter', eventClassName: 'track7', textColor: 'black' },
            { id: 'hoofdgebouw-room-2', title: 'Hoofdgebouw Room 2', eventClassName: 'track8', textColor: 'black' },
            { id: 'hoofdgebouw-room-3', title: 'Hoofdgebouw Room 3', eventClassName: 'track9', textColor: 'black' },
            { id: 'hoofdgebouw-room-4', title: 'Hoofdgebouw Room 4', eventClassName: 'track10', textColor: 'black' },
            { id: 'shelter', title: 'Shelter', eventClassName: 'track10', textColor: 'black' },
          ],
        resources: [
          { id: 'main-stage', title: 'Main Stage' },
          { id: 'content', title: 'Content' },
          { id: 'terrein', title: 'Terrein' },
          { id: 'berkenhof', title: 'Berkenhof' },
          { id: 'hardware-hacking-tent', title: 'Hardware Hacking Tent' },
          { id: 'knutselbaar', title: 'KnutselBaar' },
          { id: 'hoofdgebouw-refter', title: 'Hoofdgebouw Refter' },
          { id: 'hoofdgebouw-room-2', title: 'Hoofdgebouw Room 2' },
          { id: 'hoofdgebouw-room-3', title: 'Hoofdgebouw Room 3' },
          { id: 'hoofdgebouw-room-4', title: 'Hoofdgebouw Room 4' },
          { id: 'shelter', title: 'Shelter' },
        ],

        eventAfterAllRender: function() {
            if ( !$(".fc-day2-button").hasClass("fc-state-active") && !$(".fc-day3-button").hasClass("fc-state-active") ) {
                $(".fc-day1-button").addClass("fc-state-active");
            }
        },

        eventClick: function(calEvent, jsEvent, view) {

            $(".calendar-preview .desc").html( he.decode( calEvent.desc ) );
            $(".calendar-preview h2").text( calEvent.title );
            $(".calendar-preview .location a").text( calEvent.location );
            $(".calendar-preview .location a").attr("href","{{site.baseurl}}/locations/"+calEvent.location);
            $(".calendar-preview .type").text(calEvent.type);
            $(".calendar-preview .link").attr("href","{{site.baseurl}}/activities/"+calEvent.name);
            $(".popover-wrapper").show();
            $(".calendar-preview").show();

            $(this).addClass('calevent-selected');

        }
    });

    $(".popover-wrapper").click(function(e) {
        $(".popover-wrapper").hide();

        $(".fc-event").removeClass('calevent-selected');
    });

    $(".popover-wrapper").hide();

/*
    $(".toggletrack").hover(function(e) {
        if ( "visibility_off" != $(this).children(".material-icons").text() ) {
            $(this).children(".material-icons").text("visibility_off");
        } else {
            $(this).children(".material-icons").text("visibility");
        }
    });
*/
    $(".toggletrack").click(function(e) {
        e.preventDefault();
        var trackname = $(this).data('track');
        $(this).toggleClass("visible");
        if ( !$(this).hasClass("visible") ) {
            $("#calendar").fullCalendar('removeEventSource', '{{site.baseurl}}/'+trackname+'.json');
            //console.log($(this).children(".material-icons").text());
            $(this).children(".material-icons").text("visibility_off");
        } else {
            $("#calendar").fullCalendar('addEventSource', {
                url: '{{site.baseurl}}/'+trackname+'.json', // use the `url` property
                //color: 'blue',    // an option!
                className: trackname,
                textColor: 'black' // an option!
            });
            $(this).children(".material-icons").text("visibility");
        }
    });

});
