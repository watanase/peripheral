$(function(){
  function buildHTML(comment){
    let html = `
                <div class = "comment-list>
                <h2>コメント一覧</h2>
                  ${comment.content}
                </div>`
    return html;
  }
  $("#new-comment").on("submit",function(e){
    e.preventDefault();

    let formData = new FormData(this)
    let url = $(this).attr("action");
    $.ajax({
      type: "POST",
      url: url,
      datatype: "json",
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('comment-area').val('');
    })
  })
})