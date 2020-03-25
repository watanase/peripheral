// // 入力文字数のカウント
$(function () {
  $(".text-field").on("keydown keyup keypress change", function () {
    let inputCount = $(this).val().replace(/\n/g, "改行").length;
    $(".count-name").text(inputCount);
  });
  $("textarea").on("keydown keyup keypress change", function () {
    let profileCount = $(this).val().replace(/\n/g, "改行").length;
    $(".count-profile").text(profileCount);
  });
});