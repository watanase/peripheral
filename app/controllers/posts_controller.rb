class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def new
  end

  def create
    @post = Post.new(post_params)
  end

  def show
  end

  private
  def post_params
    params.require(:post).permit(:title, :text, :image)
  end
end
