# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  def after_sign_in_path_for(_resource)
    if params[:user][:path]
      if params[:user][:path] == "#{params[:user][:base_path]}/users/sign_in"
        root_path
      else
        params[:user][:path]
      end
    else
      root_path
    end
  end

  def record_not_found
    render file: "#{Rails.root}/public/404.html", status: :bad_request, layout: false
  end
end
