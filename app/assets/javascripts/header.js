// 
// ユーザーネームマウスオーバー
// 
$(function () {
  $('.nav-mypage').hover(function () {
    $("ul:not(:animated)", this).slideDown(0);
  }, function () {
    $("ul.drop-menu", this).slideUp(0);
  });
});
// 
// ハンバーガーメニューのクリック
// 
$(function () {
  $('.toggle').click(function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('.nav').addClass('active');
    } else {
      $('.nav').removeClass('active');
    }
  });
});
// 
// ウィンドウのサイズで判断
// 
$(window).resize(function () {
  var w = $(window).width();
  var x = 900;
  if (w > x) {
    $('.nav').removeClass('active');
  }
  if (w < x + 1) {
    $('.toggle').removeClass('active');
  }
});