# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def after_sign_in_path_for(resource)
    if params[:user][:path] == "/users/sign_in"
      return root_path
    end
    params[:user][:path]
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def current_user_is_admin
    render plain: "404 Not Found", status: :not_found unless current_user.admin?
  end

  def current_user_is_staff
    render plain: "404 Not Found", status: :not_found unless current_user.admin? || current_user.staff?
  end
end
