$(function () {
  // 画像用のinputを生成する関数
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
  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url) => {
    const html = `<li>
                    <img id="pre_${index}" data-index="${index}" src="${url}" width="100px" height="100px">
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
  // 
  // ファイルを選択したときの処理
  // 
  $('#image-box').on('change', '.js-file', function (e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    const count = $('.js-remove').length;
    // fileIndex = targetIndex
    // 該当indexを持つimgタグがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {  // 新規画像追加の処理
      $('#previews').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-box').append(buildFileField(targetIndex + 1));
      // 入力済みのinput欄を非表示
      $(`#image_${targetIndex}`).hide();
      // fileIndex.shift();
      // // 末尾の数に1足した数を追加する
      // fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
      if (count > 2) $(`#image_${targetIndex + 1}`).hide();
    }
  });
  // 
  // ファイルを削除したときの処理
  // 
  $('#previews').on('click', '.js-remove', function () {
    const targetIndex = $(this).siblings().data('index')
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    // もしチェックボックスが存在すればチェックを入れる
    const count = $('.js-remove').length;
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    // 非表示のinput欄を表示
    $(this).parent().remove();
    $(`#image_${targetIndex}`).remove();
    if (count == 4) $(`#image_4`).show();
    for (var i = targetIndex; i < 4; i++) {
      $(`#image_${i + 1}`).attr('data-index', `${i}`);
      $(`#image_${i + 1}`).attr('id', `image_${i}`);
      $(`#post_images_attributes_${i + 1}_src`).attr('name', `post[images_attributes][${i}][src]`);
      $(`#post_images_attributes_${i + 1}_src`).attr('id', `post_images_attributes_${i}_src`);
      $(`#label_${i + 1}`).attr('for', `post_images_attributes_${i}_src`);
      $(`#label_${i + 1}`).attr('id', `label_${i}`);
      $(`#pre_${i + 1}`).attr('data-index', `${i}`);
      $(`#pre_${i + 1}`).attr('id', `pre_${i}`);
    };
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
  // ページに遷移したときの処理
  $(document).ready(function () {
    const remLength = $('.js-remove').length;
    const imageLength = $('.hidden-destroy').length
    if (imageLength > 0) $('.js-file_group').hide()
    if (imageLength > 3) $('.js-file_edit').hide()
    if (remLength == 0) $("#image_1, #image_2, #image_3, #image_4").remove()
  });
});