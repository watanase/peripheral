class PostsController < ApplicationController
  def index
    @posts = Post.all.includes(:user)
    @all_ranks = Post.create_all_ranks
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params)
    @post.user_id = current_user.id
    redirect_to root_path
  end

  def show
    @post = Post.find(params[:id])
    @favorite = Favorite.new
    @comment = Comment.new
    @comments = @post.comments.order(id: "DESC")
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    post = Post.find(params[:id])
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    redirect_to root_path
  end

  def bookmarks
    @posts = current_user.bookmark_posts.includes(:user).recent
  end

  private
  def post_params
    params.require(:post).permit(:title, :content, :images).merge(user_id: current_user.id)
  end
end
