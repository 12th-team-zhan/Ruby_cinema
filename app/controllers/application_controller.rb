# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound ,with: :record_not_found
  
  private

  def after_sign_in_path_for(resource)
    if params[:user]
      if params[:user][:path] == "/users/sign_in"
        root_path
      end
      params[:user][:path]
    else 
      root_path
    end
  end

  def current_user_is_admin
    render file: "#{Rails.root}/public/404.html", layout: false, status: 400 unless current_user.admin?
  end

  def current_user_is_staff
    render file: "#{Rails.root}/public/404.html", layout: false,  status: 400 unless current_user.admin? || current_user.staff?
  end

  def record_not_found
    render file: "#{Rails.root}/public/404.html", status: 400, layout: false 
  end
end
