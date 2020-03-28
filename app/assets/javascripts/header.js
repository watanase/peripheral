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
  // 
  // ヘッダーマウスオーバー
  // 
  $('.nav-mypage').hover(function () {
    $(this).find('.drop-menu').show()
  }, function () {
    $(this).find('.drop-menu').hide()
  })
});
