$(function(){
  function buildHTML(comment){
    let html = `<p>
                  ${comment.content}
                </p>`
    return html;
  }
  $("#new-comment").on("submit",function(e){
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
    .done(function(comment){
      let html = buildHTML(comment);
      $('.comment-list').prepend(html);
      $('.comment-area').val('');
      $('.comment-submit').prop('disabled', false);
    })
    .fail(function(){
      alert("エラーが発生しました。お手数ですがリロードお願いします。コメントはログインしていないと投稿できません。");
    })
  })
})