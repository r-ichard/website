/*****
 * CONFIGURATION
 */
//Main navigation
$.navigation = $('nav > ul.nav');

$.panelIconOpened = 'icon-arrow-up';
$.panelIconClosed = 'icon-arrow-down';

//Default colours
$.brandPrimary = '#20a8d8';
$.brandSuccess = '#4dbd74';
$.brandInfo = '#63c2de';
$.brandWarning = '#f8cb00';
$.brandDanger = '#f86c6b';

$.grayDark = '#2a2c36';
$.gray = '#55595c';
$.grayLight = '#818a91';
$.grayLighter = '#d1d4d7';
$.grayLightest = '#f8f9fa';

'use strict';

/****
 * MAIN NAVIGATION
 */

$(document).ready(function ($) {
    // Enable bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();
    // Add class .active to current link
    $.navigation.find('a').each(function () {

        var cUrl = String(window.location).split('?')[0];

        if (cUrl.substr(cUrl.length - 1) == '#') {
            cUrl = cUrl.slice(0, -1);
        }

        if ($($(this))[0].href == cUrl) {
            $(this).addClass('active');

            $(this).parents('ul').add(this).each(function () {
                $(this).parent().addClass('open');
            });
        }
    });

    // Dropdown Menu
    $.navigation.on('click', 'a', function (e) {

        if ($.ajaxLoad) {
            e.preventDefault();
        }

        if ($(this).hasClass('nav-dropdown-toggle')) {
            $(this).parent().toggleClass('open');
            resizeBroadcast();
        }

    });

    function resizeBroadcast() {

        var timesRun = 0;
        var interval = setInterval(function () {
            timesRun += 1;
            if (timesRun === 5) {
                clearInterval(interval);
            }
            window.dispatchEvent(new Event('resize'));
        }, 62.5);
    }

    /* ---------- Main Menu Open/Close, Min/Full ---------- */
    $('.navbar-toggler').click(function () {

        if ($(this).hasClass('sidebar-toggler')) {
            $('body').toggleClass('sidebar-hidden');
            resizeBroadcast();
        }

        if ($(this).hasClass('aside-menu-toggler')) {
            $('body').toggleClass('aside-menu-hidden');
            resizeBroadcast();
        }

        if ($(this).hasClass('mobile-sidebar-toggler')) {
            $('body').toggleClass('sidebar-mobile-show');
            resizeBroadcast();
        }

    });

    $('.sidebar-close').click(function () {
        $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
    });

    /* ---------- Disable moving to top ---------- */
    $('a[href="#"][data-top!=true]').click(function (e) {
        e.preventDefault();
    });

});

/****
 * CARDS ACTIONS
 */

$(document).on('click', '.card-actions a', function (e) {
    e.preventDefault();

    if ($(this).hasClass('btn-close')) {
        $(this).parent().parent().parent().fadeOut();
    } else if ($(this).hasClass('btn-minimize')) {
        var $target = $(this).parent().parent().next('.card-block');
        if (!$(this).hasClass('collapsed')) {
            $('i', $(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
        } else {
            $('i', $(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
        }

    } else if ($(this).hasClass('btn-setting')) {
        $('#myModal').modal('show');
    }

});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(url) {

    /* ---------- Tooltip ---------- */
    $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement": "bottom", delay: {show: 400, hide: 200}});

    /* ---------- Popover ---------- */
    $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

}
$('#copy').click(function () {
    target = document.querySelector('#thisPollId');
    target.focus();
    target.setSelectionRange(0, target.value.length);
    document.execCommand("copy");
    $(this).html('<i class="fa fa-check"></i>&nbsp;Copié');

});

$('.send-mail-modal').click(function () {
    var url = $(this).data('url');
    var id = $(this).data('id');
    $('#thisPollId').val(url);
    $('#poll_id').val(id);
    $('.state').hide();
});

$('#shareModal').on('hide.bs.modal', function () {
    $('#thisPollId').val('Erreur');
    $('#poll_id').val('');
    $('#user_email').val('');
    $('.state').hide();
    $('#mail-input-group').show();
    $('#copy').html('<i class="fa fa-clipboard"></i>&nbsp;Copier');
});

$('#send-mail').click(function () {
    var id = $('#poll_id').val();
    var mail = $('#user_email').val();
    var postTo = $(this).data('post');

    if (validateEmail(mail) && postTo) {
        $.ajax({
            method: "POST",
            url: postTo,
            data: { id: id, email: mail }
            }).done(function( msg ) {
                $('.state').hide();
                $('#mail-input-group').hide();
                $('#mail-share-success').show();
            })
            .fail(function( jqXHR, textStatus ) {
                $('#user_email').css('border', '1px solid red');
                $('#mail_errors').show();
            });
    } else {
        $('#user_email').css('border', '1px solid red');
        $('#mail_errors').show();
    }

});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}