$(function () {
  // 
  // ウィンドウのサイズで判断
  // 
  $(window).resize(function () {
    var w = $(window).width();
    var x = 900;
    if (w > x) {
      $('.nav, .toggle').removeClass('active');
    }
    // 
    // ユーザーネームマウスオーバー
    // 改善保留
    // if (w > x) {
    //   $('.nav-mypage').hover(function () {
    //     if (w > x) {
    //     }
    //     $("ul:not(:animated)", this).slideDown(0);
    //   }, function () {
    //     $("ul.drop-menu", this).slideUp(0);
    //   });
    // }
  });
  // 
  // ハンバーガーメニューのクリック
  // 
  $('.toggle').click(function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('.nav').addClass('active');
    } else {
      $('.nav').removeClass('active');
    }
  });
});
