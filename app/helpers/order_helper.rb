# frozen_string_literal: true

module OrderHelper
  def order_list(order)
    html = "<p>訂單序號: #{order.serial} </p>
            <p>電影名稱: #{order.tickets.first.showtime.movie.name}</p>
            <p>影城: #{order.tickets.first.showtime.cinema.theater.name}</p>
            <p>影廳: #{order.tickets.first.showtime.cinema.name}</p>"
    seat_list = ''

    order.tickets.each do |ticket|
      cinema_col = ticket.showtime.cinema.max_column
      seat_id = ticket.seat.to_i
      col, seat_id = seat_id.divmod(cinema_col)
      seat_id = cinema_col if seat_id.zero?
      seat_list += "#{(col + 64).chr}排#{seat_id}號"
    end

    html += "<p>座位: #{seat_list} </p>
                   <p>開演時間: #{order.tickets.first.showtime.started_at.strftime('%Y/%m/%d %H:%M')}</p>"
    html.html_safe
  end
end
