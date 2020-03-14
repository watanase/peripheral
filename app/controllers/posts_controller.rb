class PostsController < ApplicationController
  before_action :set_post, except: %i[index new create search]
  before_action :move_to_index, only: %i[new create edit update destroy]
  def index
    @posts = Post.includes(:images).order(id: 'DESC').page(params[:page]).per(20)
    @all_ranks = Post.create_all_ranks
  end

  def new
    @post = Post.new
    @post.images.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to root_path
    else
      render :new
    end
    @post.user_id = current_user.id
  end

  def show
    @comment = Comment.new
    @comments = @post.comments.order(id: 'DESC')
  end

  def destroy
    @post.destroy
    redirect_to root_path
  end

  def search
    @posts = Post.search(params[:keyword]).page(params[:page]).per(20)
    @all_ranks = Post.create_all_ranks
  end

  def set_post
    @post = Post.find(params[:id])
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, images_attributes: %i[src _destroy id]).merge(user_id: current_user.id)
  end

  def move_to_index
    redirect_to action: :index unless user_signed_in?
  end
end
