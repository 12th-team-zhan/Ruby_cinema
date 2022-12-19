# frozen_string_literal: true

class TicketingController < ApplicationController
  def select_tickets
    @showtime=Showtime.find(params[:showtimeid])
  end

  def select_seats
    @showtime=Showtime.find(params[:showtimeid])
    @cinema = Cinema.find(@showtime.cinema.id)
    @not_seat = Seat.find_by(cinema_id: @showtime.cinema.id, category: 'not_added')
  end

  def seat_reservation
    SelectseatChannel.speak(params)
    render json: { status: 'ok', params: }
  end
  def pay
    render html:params
  end
end
