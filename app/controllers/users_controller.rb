class UsersController < ApplicationController
  before_action :set_user

  def posts; end

  def edit; end

  def show
    @posts = @user.posts.page(params[:page]).per(5).order('created_at DESC')
  end

  def favorite
    @favorite_posts = @user.favorited_posts
  end

  def follows
    @users = @user.followings
  end

  def followers
    @users = @user.followers
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
