// const { constant } = require("lodash");

$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var height = $(window).height();
    // $(".lazy").lazy();
    $('#content').css({'min-height' : height - $('.copyright').outerHeight(true)})
        $(window).on('resize',function(){
        $('#content').css({'min-height' : height - $('.copyright').outerHeight(true)})
    })
});

// copy link to share
function copyLink(element) {
    var text = $("#linkToCopy").get(0)
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    document.getElementById("copyLinkButton").innerHTML = "Copied!";
}
