# frozen_string_literal: true

module TickingHelper
  def format_seats(cinema_col)
    cinema_col = cinema_col.to_i
    res = ''

    @order.tickets.each do |ticket|
      seat_id = ticket.seat.to_i
      col, seat_id = seat_id.divmod(cinema_col)
      seat_id = cinema_col if seat_id.zero?
      res += "#{(col + 64).chr}排#{seat_id}號"
    end

    res
  end
end
