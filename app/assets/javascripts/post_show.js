$(function () {
  // 画像の拡大処理
  var luminousTrigger = document.querySelectorAll('.luminous');
  if (luminousTrigger !== null) {
    new LuminousGallery(luminousTrigger);
  }
  // 画像のチェンジアップ処理
  $(".show-images").mouseover(function () {
    let imageSrc = $(this).attr("src");
    $(".view-image").attr({ src: imageSrc })
  })
})