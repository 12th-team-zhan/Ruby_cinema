module Admin
  class UsersController < ApplicationController
    before_action :find_user ,only: [:edit ,:update , :destroy]
    before_action :authenticate_user!


    def index
      @users=User.all
      
    end

    def edit
      @roles_select_options = User.roles.keys.map do |key|
        [User.human_attribute_name("role.#{key}"), key]
      end
    end

    def update
      if @user.update(clean_user)
        redirect_to admin_users_path ,notice:"修改完成"
        else
        render :edit
      end
    end

    def destroy
      @user.destroy
      redirect_to admin_users_path ,alert:"已刪除"
    end

    private
    def find_user
      @user=User.find(params[:id])
    end

    def clean_user
      params.require(:user).permit(:name , :email , :password , :role)
    end
  end
end