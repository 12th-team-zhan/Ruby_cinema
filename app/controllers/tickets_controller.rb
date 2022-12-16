# frozen_string_literal: true

class TicketsController < ApplicationController
  before_action :authenticate_user!
  
  def index 
    @ticket = Ticket.new
    @theater = Theater.first
    @showtime = Showtime.first
    @movie = @showtime.movie
    @cinema = Cinema.second
    
    # @cinema = @showtime.cinema
    # @theater = @cinema.theater
    @ticket_amount = @cinema.ticket_amount

  end

  def add_quantity
    # session[:cart9487] = params[:ticket]
    @showtime = Showtime.find(params[:showtime_id])
    movie_name = @showtime.movie.name
    # cinema_name = @showtime.cinema.name
    cinema_name = "1"

    ticket_info = params[:ticket]
    session[:cart9487] = ticket_info.merge!(movie_name: movie_name, cinema_name: cinema_name)

    redirect_to new_ticket_path
  end

  def show 
  end

  def new
    @ticket = Ticket.new
    @info = session[:cart9487]
  end

  def create
    @info = session[:cart9487]
    @ticket = Ticket.new(@info)
    @ticket.save
    render html: params
  end

  def buy
    
  end

  def destroy
    @ticket.destroy
    redirect_to 
  end
  private
  def find_ticket
    @ticket =Ticket.find(params[:id])
  end

  def ticket_params
    params.require(:ticket).permit(:regular_quantity, :concession_quantity, :elderly_quantity, :disability_quantity, :movie_name, :cinema_name)
  end
end
