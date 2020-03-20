$(function () {
  const buildFileField = (index) => {
    const html = `<div class="js-file_group" data-index="${index}" id="image_${index}">
                    <input class="js-file" type="file"
                    name="post[images_attributes][${index}][src]"
                    id="post_images_attributes_${index}_src">
                    <label id="label_${index}" for="post_images_attributes_${index}_src">
                    <i class="fas fa-images"></i></label>
                  </div>`;
    return html;
  }
  const buildImg = (index, url) => {
    const html = `<li id="pre_${index}">
                    <img data-index="${index}" src="${url}" width="100px" height="100px">
                    <div class="js-remove">
                      <svg xmlns="http://www.w3.org/2000/svg"
                      width="32" height="32" viewBox="0 0 24 24" fill="none"
                      stroke="#3d3d3d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </div>
                  </li>`;
    return html;
  }
  let fileIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);
  $('.hidden-destroy').hide();
  // 
  // ファイルを選択したときの処理
  // 
  function indexPlus() {
    fileIndex.shift();
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
  }
  $('#image-box').on('change', '.js-file', function (e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    const count = $('.js-remove').length;
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {
      $('#previews').append(buildImg(targetIndex, blobUrl));
      if (count < 3) {
        $('#image-box').append(buildFileField(fileIndex[0]));
        indexPlus()
      }
      $(`#image_${targetIndex}`).hide();
    }
  });
  // 
  // ファイルを削除したときの処理
  // 
  $('#previews').on('click', '.js-remove', function () {
    const targetIndex = $(this).siblings().data('index')
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    const count = $('.js-remove').length;
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    $(this).parent().remove();
    $(`#image_${targetIndex}`).remove();
    if (count == 4) {
      $('#image-box').append(buildFileField(fileIndex[0]));
      indexPlus()
    }
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
    // 
    // 編集機能改善時用
    // 
    // for (var i = targetIndex; i < 4; i++) {
    //   $(`#image_${i + 1}`).attr('data-index', `${i}`).attr('id', `image_${i}`);
    //   $(`#post_images_attributes_${i + 1}_src`).attr(
    //     'name', `post[images_attributes][${i}][src]`).attr(
    //       'id', `post_images_attributes_${i}_src`);
    //   $(`#label_${i + 1}`).attr(
    //     'for', `post_images_attributes_${i}_src`).attr(
    //       'id', `label_${i}`);
    //   $(`#pre_${i + 1}`).attr('data-index', `${i}`).attr('id', `pre_${i}`);
    // };
  });
  // 
  // ページに遷移したときの処理
  // 
  $(document).ready(function () {
    const remLength = $('.js-remove').length;
    const imageLength = $('.hidden-destroy').length
    if (imageLength > 0) $('.js-file_group').hide()
    $(`#image_${fileIndex[0] - 1}`).show()
    if (imageLength == 4) $("#image_4").remove()
    // if ($(".hidden-destroy:checked").val() == true) {
    //   $(`#pre_${hiddenCheck}`).hide()
    // }
    if (remLength == 0) $("#image_1, #image_2, #image_3").remove()
  });
});