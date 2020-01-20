class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :avatar_cache, :remove_avatar])
  end

  def after_update_path_for(resource)
    user_path(current_user)
  end

end
