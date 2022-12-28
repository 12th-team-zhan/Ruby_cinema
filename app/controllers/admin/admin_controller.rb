# frozen_string_literal: true

module Admin
  class AdminController < ApplicationController
    layout 'admin_application'
    before_action :current_user_is_staff
  end
end
