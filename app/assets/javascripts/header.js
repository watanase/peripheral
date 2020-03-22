// 
// ユーザーネームマウスオーバー
// 
$(function () {
  $('.nav-mypage').hover(function () {
    $("ul:not(:animated)", this).slideDown();
  }, function () {
    $("ul.drop-menu", this).slideUp();
  });
});
// 
// ハンバーガーメニューのクリック
// 
$(function () {
  $('.toggle').click(function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('.globalMenuSp').addClass('active');
    } else {
      $('.globalMenuSp').removeClass('active');
    }
  });
});