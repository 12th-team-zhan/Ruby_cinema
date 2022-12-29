# frozen_string_literal: true

class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :find_order, only: %i[show cancel]

  def index
    @orders = Order.includes(tickets: [showtime: [:movie, { cinema: :theater }]]).where(user_id: current_user.id).references(:tickets).paginate(
      page: params[:page], per_page: 5
    ).order(created_at: :desc)
  end

  def new
    @order = current_user.orders.new
  end

  def create
    @order = current_user.orders.new(clean_order_params)
    if @order.save
      redirect_to orders_path, notice: '訂單已成立'
    else
      render :new, alert: '建立失敗'
    end
  end

  def show; end

  def cancel
    @order.update(status: 'cancel')
    render json: { status: 'cancel' }
  end

  private

  def clean_order_params
    params.require(:order).permit(:amount, :payment_method, :created_at)
  end

  def find_order
    @order = current_user.orders.find(params[:id])
  end
end
