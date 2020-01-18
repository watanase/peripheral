class UsersController < ApplicationController
  def new
    @user = User.find(session[:user_id])
  end

  def edit
  end
end
