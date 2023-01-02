# frozen_string_literal: true

module Admin
  class TicketCheckingController < AdminController
    def index
      render layout: 'checking_application'
    end

    def scan
      @ticket = Ticket.find_by(serial: params[:serial])
      if @ticket.nil?
        res = 'fail'
        text = '錯誤的序號，如有問題請洽詢櫃檯人員'
      elsif @ticket.status == 'unuses'
        res = 'success'
        text = "序號#{@ticket.serial}"
      # @ticket.update(status: 1)
      else
        res = 'fail'
        text = '此票已使用過，如有問題請洽詢櫃檯人員'
      end

      render json: { res:, text: }
    end
  end
end
