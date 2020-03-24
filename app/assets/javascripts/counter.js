// 入力文字数のカウント
$(function () {
  $(".text-field").bind('keydown keyup keypress change', function () {
    let countNum = ($(this).val().length);
    $(".count-name").html(countNum);
  });
  $("textarea").bind('keydown keyup keypress change', function () {
    let countNum = ($(this).val().length);
    $(".count-profile").html(countNum);
  });
  // テキストエリアの自動調整
  $(".input-text").height(30);//init
  $(".input-text").css("lineHeight", "20px");//init

  $(".input-text").on("input", function (evt) {
    if (evt.target.scrollHeight > evt.target.offsetHeight) {
      $(evt.target).height(evt.target.scrollHeight);
    } else {
      var lineHeight = Number($(evt.target).css("lineHeight").split("px")[0]);
      while (true) {
        $(evt.target).height($(evt.target).height() - lineHeight);
        if (evt.target.scrollHeight > evt.target.offsetHeight) {
          $(evt.target).height(evt.target.scrollHeight);
          break;
        }
      }
    }
  });
});