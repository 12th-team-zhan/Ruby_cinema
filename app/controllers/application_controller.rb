# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  def after_sign_in_path_for(_resource)
    if params[:user]
      root_path if params[:user][:path] == '/users/sign_in'
      params[:user][:path]
    else
      root_path
    end
  end

  def current_user_is_admin
    render file: "#{Rails.root}/public/404.html", layout: false, status: :bad_request unless current_user.admin?
  end

  def current_user_is_staff
    return if current_user.admin? || current_user.staff?

    render file: "#{Rails.root}/public/404.html", layout: false,
           status: :bad_request
  end

  def record_not_found
    render file: "#{Rails.root}/public/404.html", status: :bad_request, layout: false
  end
end
