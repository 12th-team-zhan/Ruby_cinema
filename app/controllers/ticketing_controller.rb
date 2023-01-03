# frozen_string_literal: true

class TicketingController < ApplicationController
  before_action :calc_amount, only: %i[create]
  before_action :calc_ticket_category_arr, only: %i[create]
  skip_before_action :verify_authenticity_token, only: %i[checkout]

  def select_tickets
    @showtime = Showtime.includes([:movie, { cinema: :theater }]).where(id: params[:showtimeid]).references(:movie,
                                                                                                            :cinema)
    @showtime = @showtime.first
  end

  def select_seats
    @showtime = Showtime.find(params[:showtimeid])
    @cinema = Cinema.find(@showtime.cinema.id)
    @not_seat = Seat.find_by(cinema_id: @showtime.cinema.id, category: 'not_added')
    @ticket_list = [("全票#{params[:regularAmount]}" unless params[:regularAmount] == '0').to_s,
                    ("優待票#{params[:concessionAmount]}" unless params[:concessionAmount] == '0').to_s,
                    ("敬老票#{params[:elderlyAmount]}" unless params[:elderlyAmount] == '0').to_s,
                    ("愛心票#{params[:disabilityAmount]}" unless params[:disabilityAmount] == '0').to_s]
  end

  def seat_reservation
    SelectSeatJob.perform_async(params[:status], params[:showtime_id], params[:seat_id], params[:id])
    render json: { status: 'ok' }
  end

  def create
    if user_signed_in?
      showtime_id = params[:showtimeid]

      @order_data = { amount: @amount }
      @order = current_user.orders.new(@order_data)
      @order.save

      i = 0
      params[:seatId].split(',').each do |seatId|
        serial = generate_serial
        ticket_data = { seat: seatId, showtime_id:, category: @tickets_category[i],
                        order_id: @order.id }
        @ticket = Ticket.new(ticket_data)
        @ticket.save
        i += 1
        end

    session[:order_id] = @order.id
    session[:showtime_id] = showtime_id
    redirect_to pay_ticketing_index_path
    else
      redirect_to request.env["HTTP_REFERER"]
    end
    
  end

  def destroy
    @order = Order.find(session[:order_id])
    @order.destroy
    redirect_to root_path
  end

  def pay
    @order = Order.find(session[:order_id])
    @ticket = Ticket.includes(showtime: [:movie,
                                         { cinema: :theater }]).where(order_id: @order.id).limit(1).references(:showtime)
    @ticket = @ticket.first
    order = { slug: @order.serial, amount: @order.amount, name: '電影票', email: current_user.email }
    @form_info = Mpg.new(order).form_info
  end

  def checkout
    response = MpgResponse.new(params[:TradeInfo])
    @order = Order.find_by(serial: response.order_no)
    @ticket = Ticket.includes(showtime: [:movie,
                                         { cinema: :theater }]).where(order_id: @order.id).limit(1).references(:showtime)
    @ticket = @ticket.first
    user = User.find(@order.user_id)
    sign_in(user)

    if response.status == 'SUCCESS'
      @result = 'success'
      @order.update(status: 1)
    else
      @result = 'fail'
    end
  end

  private

  def calc_amount
    @showtime = Showtime.includes(:cinema).where(id: params[:showtimeid]).references(:cinema)
    @amount = params[:regularAmount].to_i * @showtime.first.cinema.regular_price +
              params[:concessionAmount].to_i * @showtime.first.cinema.concession_price +
              params[:elderlyAmount].to_i * @showtime.first.cinema.elderly_price +
              params[:disabilityAmount].to_i * @showtime.first.cinema.disability_price
  end

  def calc_ticket_category_arr
    @tickets_category = []
    @tickets_category.concat([0] * params[:regularAmount].to_i)
    @tickets_category.concat([1] * params[:concessionAmount].to_i)
    @tickets_category.concat([2] * params[:elderlyAmount].to_i)
    @tickets_category.concat([3] * params[:disabilityAmount].to_i)
  end

  def generate_serial
    serial = SecureRandom.alphanumeric(10)
  end
end
