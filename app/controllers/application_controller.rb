# frozen_string_literal: true

class ApplicationController < ActionController::Base
  after_action :store_action

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  def store_action
    return unless request.get?
    if (request.path != '/users/sign_in' &&
        request.path != '/users/sign_up' &&
        request.path != '/users/password/new' &&
        request.path != '/users/password/edit' &&
        request.path != '/users/confirmation' &&
        request.path != '/users/sign_out' &&
        !request.xhr?) # don't store ajax calls
      store_location_for(:user, request.fullpath)
    end
  end

  def record_not_found
    render file: "#{Rails.root}/public/404.html", status: :bad_request, layout: false
  end

end
