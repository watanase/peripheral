$(function () {
  $('.nav-mypage').hover(function () {
    $("ul:not(:animated)", this).slideDown();
  }, function () {
    $("ul.drop-menu", this).slideUp();
  });
});