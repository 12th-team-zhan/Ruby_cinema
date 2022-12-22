# frozen_string_literal: true

module Admin
  class CinemasController < ApplicationController
    before_action :find_theater, only: %i[index new create]
    before_action :find_cinema, only: %i[show edit update destroy]
    def index
      @cinemas = @theater.cinemas.order(id: :desc)
    end

    def show; end

    def new
      @cinema = Cinema.new
    end

    def create
      @cinema = @theater.cinemas.new(cinema_params)

      if @cinema.save
        redirect_to admin_theater_cinemas_path(@theater), notice: '成功新增影廳'
      else
        render :new
      end
    end

    def edit; end

    def update
      @seats = @cinema.seats.first

      if @seats.nil?
        redirect_to admin_theater_cinemas_path(@cinema.theater_id), alert: '影廳座位未建立'
      else
        seat_list_raw = @seats.seat_list

        seat_list_new = update_seat_list(seat_list_raw, cinema_params[:max_row].to_i, cinema_params[:max_column].to_i)
  
        if not @seats.update({seat_list: seat_list_new})
          render :edit
        end

        if @cinema.update(cinema_params)
          redirect_to admin_theater_cinemas_path(@cinema.theater_id), notice: '成功更新影廳'
        else
          render :edit
        end
      end
    end

    def destroy
      @cinema.destroy
      redirect_to admin_theater_cinemas_path(@cinema.theater_id), notice: '影廳已刪除'
    end

    private

    def cinema_params
      params.require(:cinema).permit(:name, :max_row, :max_column, :regular_price, :concession_price, :disabled_price, :elderly_price)
    end

    def find_cinema
      @cinema = Cinema.find(params[:id])
    end

    def find_theater
      @theater = Theater.find(params[:theater_id])
    end

    def update_seat_list(seats_raw, new_row, new_column)
      seats_raw_flatten = seats_raw.flatten
      seats_raw_row = seats_raw.length
      seats_raw_column = seats_raw[0].length

      if seats_raw_row != new_row || seats_raw_column != new_column
        seats_new = Array.new(new_row) { Array.new(new_column, 0) }

        seats_raw_flatten.each_with_index do |item, index|
          seat_index = index.divmod(seats_raw_row)
          if item != "0" && seat_index[0] <= new_row && seat_index[1] <= new_column
            
            seats_new[seat_index[0]][seat_index[1]] = item
          end
        end
      end

      return seats_new
    end  
  end
end
