# frozen_string_literal: true

class TicketsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :pay]
  skip_before_action :verify_authenticity_token, only: [:checkout, :change_status]

  def index
    @tickets = Ticket.all
  end

  def show; end

  def create
    info = ticket_params

    @showtime = Showtime.find(ticket_params["showtime_id"].to_i)
    @cinema = @showtime.cinema
    @theater = @cinema.theater
    info[:movie_name] = @showtime.movie.name
    info[:cinema_name] = @cinema.name
    info[:theater_name] = @theater.name

    @ticket = Ticket.new(info)
    if @ticket.save
      redirect_to pay_ticket_path(@ticket)
    else
      redirect_to root_path
    end
  end

  def pay
    @ticket = Ticket.find(params[:id])
    order = {slug: @ticket.id, amount: 500, name: '電影票', email: current_user.email}
    @form_info = Mpg.new(order).form_info
  end

  def destroy
    @ticket = Ticket.find(params[:id])
    @ticket.destroy
    redirect_to root_path
  end

  def checkout
    response = MpgResponse.new(params[:TradeInfo])

    if response.status == "SUCCESS"
      @result = response.result
      @ticket = Ticket.find(@result["MerchantOrderNo"].to_i)
      render :checkout
    else
      redirect_to root_path, alert: "付款過程報錯，付款失敗"
    end
  end

  private

  def find_ticket
    @ticket = Ticket.find(params[:id])
  end

  def ticket_params
    permitted = params.permit(:showtime_id, :regular_quantity, :concession_quantity, :elderly_quantity, :disability_quantity, :seat_list)
    permitted.to_h || {}
  end
end
