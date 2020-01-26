// 画像の拡大処理
$(function () {
  var luminousTrigger = document.querySelectorAll('.luminous');
  if (luminousTrigger !== null) {
    new LuminousGallery(luminousTrigger);
  }
  $(".show-images").mouseover(function () {
    let imageSrc = $(this).attr("src");
    $(".view-image").attr({ src: imageSrc })
    $(".view-image").fadeIn("slow");
  })
})
// 画像のリストアップ処理