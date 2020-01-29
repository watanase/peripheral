class UsersController < ApplicationController
  def edit
  end

  def show
    @user = User.find(params[:id])
    name = @user.name
    @posts = @user.posts.page(params[:page]).per(5).order("created_at DESC")
    @favorite_posts = @user.liked_posts
  end
end
