class UserManagementsController < ApplicationController
  before_action :find_user ,only: [:edit ,:update , :destroy]

  def index
    @users=User.all
    
  end

  def edit
    @roles_select_options = User.roles.keys.map do |key|
      [User.human_attribute_name("role.#{key}"), key]
    end
  end

  def update
    # render html: params
    if @user.update(clean_user)
      redirect_to user_managements_path ,notice:"修改完成"
      else
      render :edit
    end
  end

  def destroy
    @user.destroy
    redirect_to user_managements_path ,alert:"已刪除"
  end

  private
  def find_user
    @user=User.find(params[:id])
  end

  def clean_user
    params.require(:user).permit(:name , :email , :password , :role)
  end
end
