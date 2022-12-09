class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :current_user_is_admin, only: [:edit, :update]
  before_action :find_order, only: [:edit, :update, :show, :cancel]

  def  index
    @orders = current_user.orders.all
  end

  def new
    @order = current_user.orders.new
  end

  def create
    @order = current_user.orders.new(clean_order_params)
    if @order.save
      redirect_to orders_path, notice:"訂單已成立"
    else
      render :new, alert:"建立失敗"
    end
  end

  def show
  end

  def edit
    if @order.update(clean_order_params)
      redirect_to orders_path, notice:"訂單已成立"
    else
      render :new, alert:"修改失敗"
    end
  end

  def cancel
    @order.update(status: "cancel")
    redirect_to orders_path, notice:"訂單取消"
  end

  private
  def clean_order_params
    params.require(:order).permit(:amount, :payment_method, :created_at)
  end

  def find_order
    @order = current_user.orders.find(params[:id])
  end

end
