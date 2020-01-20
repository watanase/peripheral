$(function() {
  function readURL(input) {
      if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
  $('#imgages_prev').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
      }
  }
  $("#post_images").change(function(){
      readURL(this);
  });
});