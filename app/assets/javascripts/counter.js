$(function () {

  $("input").bind('keydown keyup keypress change', function () {
    let countNum = ($(this).val().length);
    $(".count-name").html(countNum);
  });

  $("textarea").bind('keydown keyup keypress change', function () {
    let countNum = ($(this).val().length);
    $(".count-profile").html(countNum);
  });
});