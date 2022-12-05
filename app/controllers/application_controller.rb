class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  private
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def authenticate_admin!
    return if user_signed_in? && @user.admin?
    redirect_to login_users_path, alert: '請先登入帳號'
  end
end
