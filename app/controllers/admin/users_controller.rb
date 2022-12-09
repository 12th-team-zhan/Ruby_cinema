# frozen_string_literal: true

module Admin
  class UsersController < ApplicationController
    before_action :find_user, only: %i[edit update destroy]
    before_action :authenticate_user!
    before_action :current_user_is_admin, only: [:index]

    def index
      @users = User.all
    end

    def edit; end

    def update
      if @user.update(clean_user)
        redirect_to admin_users_path, notice: '修改完成'
      else
        render :edit
      end
    end

    def destroy
      @user.destroy
      redirect_to admin_users_path, alert: '已刪除'
    end

    private

    def find_user
      @user = User.find(params[:id])
    end

    def clean_user
      params.require(:user).permit(:name, :email, :password, :role)
    end
  end
end
