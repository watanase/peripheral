$(function () {
  // 画像用のinputを生成する関数
  const buildFileField = (index) => {
    const html = `<div class="js-file_group" data-index="${index}" id="image_${index}">
                    <input class="js-file" type="file"
                    name="post[images_attributes][${index}][src]"
                    id="post_images_attributes_${index}_src">
                    <input class="js-file" type="file"
                    name="post[images_attributes][${index}][src_cache]"
                    id="post_images_attributes_${index}_src_cache">
                    <label for="post_images_attributes_${index}_src">
                    <i class="fas fa-images"></i></label>
                  </div>`;
    return html;
  }
  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url) => {
    const html = `<li>
                    <img data-index="${index}" src="${url}" width="100px" height="100px">
                    <div class="js-remove">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3d3d3d" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </div>
                  </li>`;
    return html;
  }
  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1, 2, 3, 4, 5, 6];
  // 既に使われているindexを除外
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);
  // $('.hidden-destroy').hide();
  // ファイルを選択したときの処理
  $('#image-box').on('change', '.js-file', function (e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    const count = $('.js-remove').length;
    // 該当indexを持つimgタグがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {  // 新規画像追加の処理
      $('#previews').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-box').append(buildFileField(fileIndex[0]));
      // 入力済みのinput欄を非表示
      $(`#image_${targetIndex}`).hide();
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
      if (count == 5) {
        $('.js-file_group').hide();
      }
    }
  });
  // ファイルを削除したときの処理
  $('#previews').on('click', '.js-remove', function () {
    const targetIndex = $(this).siblings().data('index')
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    const count = $('.js-remove').length;
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    $(this).parent().remove();
    $(`#image_${targetIndex}`).remove();
    if (count == 6) {
      $(`#image_${fileIndex[0] - 1}`).show();
    }
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
  // ページに遷移したときの処理
  $(document).ready(function () {
    const alreadyIndex = [];
    var list = [];
    $(".js-file_group").each(function () {

      list.push($(this).attr('id'));
    });
    console.log(list)
  });
});