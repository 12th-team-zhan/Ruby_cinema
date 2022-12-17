# frozen_string_literal: true

class TicketingController < ApplicationController
  def select_tickets
    # session["ticketing_id"]=123
    # render html:params
  end

  def select_seats
    @channle_user_select_seat = SelectseatChannel.channle_user_select_seat
    @cinema = Cinema.find(12)
    @not_seat = Seat.find_by(cinema: 12, category: 'not_added')
    respond_to do |format|
      format.html
      format.json { render json: @channle_user_select_seat }
    end
  end

  def seat_reservation
    SelectseatChannel.speak(params)
    render json: { status: 'ok', params: }
  end
end
