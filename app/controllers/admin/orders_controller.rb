module Admin
  class OrdersController < ApplicationController
    before_action :authenticate_user!
    before_action :current_user_is_staff
    before_action :find_order, only: [:edit, :update, :show, :destroy, :cancel]

    def  index
      @orders = Order.all
    end

    #＝＝＝＝＝＝＝＝＝連結購物車後刪除＝＝＝＝＝＝＝＝＝
    def new
      @order = current_user.orders.new
    end

    def create
      @order = current_user.orders.new(clean_order_params)
      if @order.save
        redirect_to admin_orders_path, notice:"訂單已成立"
      else
        render :new, alert:"建立失敗"
      end
    end
    #＝＝＝＝＝＝＝＝＝/連結購物車後刪除＝＝＝＝＝＝＝＝＝

    def show;  end

    def edit;   end

    def update
      if @order.update(clean_order_params)
        redirect_to admin_orders_path, notice:"訂單已成立"
      else
        render :new, alert:"修改失敗"
      end
    end

    def destroy
      @order.destroy
      redirect_to admin_orders_path, notice:"訂單刪除"
    end

    def cancel
      @order.update(status: "cancel")
      redirect_to admin_orders_path, notice:"訂單取消"
    end

    private
    def clean_order_params
      params.require(:order).permit(:amount, :serial, :status, :payment_method)
    end

    def find_order
      @order = Order.find(params[:id])
    end

  end
end
