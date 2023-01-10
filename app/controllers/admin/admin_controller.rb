# frozen_string_literal: true

module Admin
  class AdminController < ActionController::Base
    layout 'admin_application'
    before_action :user_signed_in
    before_action :current_user_is_staff

    def user_signed_in
      return if current_user.present?

      redirect_to users_sign_in_path
    end

    def current_user_is_staff
      return if current_user.admin? || current_user.staff?

      render file: "#{Rails.root}/public/404.html", layout: false,
             status: :bad_request
    end

    def current_user_is_admin
      return if current_user.admin?

      render file: "#{Rails.root}/public/404.html", layout: false,
             status: :bad_request
    end
  end
end
