$(function () {
  function buildHTML(comment) {
    let html = `<div class="block">
                  <div class="content">
                   ${comment.content}
                  </div>
                  <div class="jarnal">
                    <div class="user-name">
                      ${comment.user_name}
                    </div>
                    <div class="date">
                      ${comment.created_at}
                    </div>
                  </div>
                </div>`
    return html;
  }
  $("#new-comment").on("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(function (comment) {
        let html = buildHTML(comment);
        $('.comment__list__show').prepend(html);
        $('.comment-area').val('');
        $('.comment-submit').prop('disabled', false);
      })
      .fail(function () {
        // alert("エラーが発生しました");
      })
  })
})