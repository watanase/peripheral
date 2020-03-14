class RelationshipsController < ApplicationController
  def create
    user = User.find(params[:user_id])
    follow = current_user.active_relationships.build(follower_id: params[:user_id])
    follow.save
    redirect_to user
  end

  def destroy
    user = User.find(params[:user_id])
    follow = current_user.active_relationships.find_by(follower_id: params[:user_id])
    follow.destroy
    redirect_to user
  end
end
