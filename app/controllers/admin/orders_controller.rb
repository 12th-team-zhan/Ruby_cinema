# frozen_string_literal: true

module Admin
  class OrdersController < AdminController
    before_action :authenticate_user!
    before_action :find_order, only: %i[edit update show destroy]

    def index
      @orders = Order.paginate(page: params[:page], per_page: 20).order(created_at: :desc)
    end

    def new
      @order = current_user.orders.new
    end

    def create
      @order = current_user.orders.new(clean_order_params)
      if @order.save
        redirect_to admin_orders_path, notice: '訂單已成立'
      else
        render :new, alert: '建立失敗'
      end
    end

    def show; end

    def edit; end

    def update
      if @order.update(clean_order_params)
        redirect_to admin_orders_path, notice: '訂單已成立'
      else
        render :new, alert: '修改失敗'
      end
    end

    def destroy
      @order.destroy
      redirect_to admin_orders_path, notice: '訂單刪除'
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
