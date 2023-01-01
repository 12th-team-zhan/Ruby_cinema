# frozen_string_literal: true

module TickingHelper
  def format_seats(cinema_col)
    cinema_col = cinema_col.to_i
    res = ''

    @order.tickets.each do |ticket|
      seat_id = ticket.seat.to_i
      col, seat_id = seat_id.divmod(cinema_col)
      seat_id = cinema_col if seat_id.zero?
      res += "#{(col + 65).chr}排#{seat_id}號"
    end

    res
  end

  def format_order(order_res)
    case order_res
    when 'success'
      html = " <h2><i class'fa-solid fa-thumbs-up me-3'></i>付款成功</h2>"
    when 'fail'
      html = " <h2><i class='fa-regular fa-face-sad-tear me-3'></i>付款失敗</h2>"
    end
    html.html_safe
  end
end
