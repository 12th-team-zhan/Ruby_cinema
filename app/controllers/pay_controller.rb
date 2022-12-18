# frozen_string_literal: true

class PayController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:abc, :show]

  def index
    p "1" * 50
    @form_info = Mpg.new().form_info
  end

  def abc
    response = MpgResponse.new(params[:TradeInfo])
    render html: {order_no: response.order_no, trans_no: response.trans_no}
  end

  def show
    p "2" * 50
    response = MpgResponse.new(params[:TradeInfo])
    p response
    p "2" * 50
  end
end
