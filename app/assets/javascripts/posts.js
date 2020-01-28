// 画像の追加削除処理
$(function () {
  //DataTransferオブジェクトで、データを格納する箱を作る
  let dataBox = new DataTransfer();
  //querySelectorでfile_fieldを取得
  let file_field = document.querySelector('input[type=file]')
  //fileが選択された時に発火するイベント
  var dropArea = document.getElementById("image-box-1");

  //loadイベント発生時に発火するイベント
  window.onload = function (e) {
    //ドラッグした要素がドロップターゲットの上にある時にイベントが発火
    dropArea.addEventListener("dragover", function (e) {
      e.preventDefault();
      //ドロップエリアに影がつく
      $(this).children('#image-box__container').css({ 'border': '1px solid rgb(204, 204, 204)', 'box-shadow': '0px 0px 4px' })
    }, false);
    //ドラッグした要素がドロップターゲットから離れた時に発火するイベント
    dropArea.addEventListener("dragleave", function (e) {
      e.preventDefault();
      //ドロップエリアの影が消える
      $(this).children('#image-box__container').css({ 'border': '1px dashed rgb(204, 204, 204)', 'box-shadow': '0px 0px 0px' })
    }, false);
    //ドラッグした要素をドロップした時に発火するイベント
    dropArea.addEventListener("drop", function (e) {
      e.preventDefault();
      $(this).children('#image-box__container').css({ 'border': '1px dashed rgb(204, 204, 204)', 'box-shadow': '0px 0px 0px' });
      var files = e.dataTransfer.files;
      //ドラッグアンドドロップで取得したデータについて、プレビューを表示
      $.each(files, function (i, file) {
        //アップロードされた画像を元に新しくfilereaderオブジェクトを生成
        var fileReader = new FileReader();
        //dataTransferオブジェクトに値を追加
        dataBox.items.add(file)
        file_field.files = dataBox.files
        //lengthで要素の数を取得
        var num = $('.item-image').length + i + 1
        //指定されたファイルを読み込む
        fileReader.readAsDataURL(file);
        // 10枚プレビューを出したらドロップボックスが消える
        if (num == 4) {
          $('#image-box__container').css('display', 'none')
        }
        //image fileがロードされた時に発火するイベント
        fileReader.onload = function () {
          //変数srcにresultで取得したfileの内容を代入
          let image = fileReader.result
          let html = `<div class='item-image' data-image="${file.name}">
                    <div class=' item-image__content'>
                      <div class='item-image__content--icon'>
                        <img src=${image}>
                      </div>
                    </div>
                    <div class='item-image__operetion'>
                      <div class='item-image__operetion--delete'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3d3d3d" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></i></i></i></div>
                    </div>
                  </div>`
          //image-box__containerの前にhtmlオブジェクトを追加　
          $('#image-box__container').before(html);
        };
        //image-box__containerにitem-num-(変数)という名前のクラスを追加する
        $('#image-box__container').attr('class', `previews-${num}`)
      })
    })
  }
  $('#img-file').change(function () {
    //選択したfileのオブジェクトをpropで取得
    let file = $('input[type="file"]').prop('files')[0];
    $.each(this.files, function (i, file) {
      //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
      let fileReader = new FileReader();
      //DataTransferオブジェクトに対して、fileを追加
      dataBox.items.add(file)
      //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に代入
      file_field.files = dataBox.files
      let num = $('.item-image').length + 1 + i
      fileReader.readAsDataURL(file);
      //画像が10枚になったら超えたらドロップボックスを削除する
      if (num == 4) {
        $('#image-box__container').css('display', 'none')
      }
      //読み込みが完了すると、imageにfileのURLを格納
      fileReader.onloadend = function () {
        let image = fileReader.result
        let html = `<div class='item-image' data-image="${file.name}">
                    <div class=' item-image__content'>
                      <div class='item-image__content--icon'>
                        <img src=${image}>
                      </div>
                    </div>
                    <div class='item-image__operetion'>
                      <div class='item-image__operetion--delete'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3d3d3d" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></i></i></i></div>
                    </div>
                  </div>`
        //image_box__container要素の前にhtmlを差し込む
        $('#image-box__container').before(html);
      }
      //image-box__containerのクラスを変更し、CSSでドロップボックスの大きさを変えてやる。
      $('#image-box__container').attr('class', `previews-${num}`)
    });
  });
  //削除ボタンをクリックすると発火するイベント
  $(document).on("click", '.item-image__operetion--delete', function () {
    //削除を押されたプレビュー要素を取得
    var target_image = $(this).parent().parent()
    //削除を押されたプレビューimageのfile名を取得
    var target_name = $(target_image).data('image')
    //プレビューがひとつだけの場合、file_fieldをクリア
    if (file_field.files.length == 1) {
      //inputタグに入ったファイルを削除
      $('input[type=file]').val(null)
      dataBox.clearData();
    } else {
      //プレビューが複数の場合
      $.each(file_field.files, function (i, input) {
        //削除を押された要素と一致した時、index番号に基づいてdataBoxに格納された要素を削除する
        if (input.name == target_name) {
          dataBox.items.remove(i)
        }
      })
      //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に再度代入
      file_field.files = dataBox.files
    }
    //プレビューを削除
    target_image.remove()
    //image-box__containerクラスをもつdivタグのクラスを削除のたびに変更
    var num = $('.item-image').length
    $('#image-box__container').show()
    $('#image-box__container').attr('class', `previews-${num}`)
  })
});
