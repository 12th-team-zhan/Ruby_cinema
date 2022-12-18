# frozen_string_literal: true

module Admin
  class SeatsController < ApplicationController
    before_action :find_cinema, only: %i[index new create edit update]

    def index
      @seats = @cinema.seats.first

      respond_to do |format|
        format.html { render :index }
        format.json { render json: { seatsArr: @seats.seat_list } }
      end
    end

    def new
      seats_arr = Array.new(@cinema.max_row) { Array.new(@cinema.max_column, 0) }

      respond_to do |format|
        format.html
        format.json { render json: { seatsArr: seats_arr } }
      end
    end

    def create
      @seats = @cinema.seats.new({seat_list: params[:seats]})

      if @seats.save
        redirect_to admin_theater_cinemas_path(@cinema.theater_id), notice: '成功新增座位'
      else
        redirect_to new_admin_cinema_seats_path(@cinema)
      end
    end

    def edit
      @not_added = @cinema.seats.find_by({ category: 'not_added' })
    end

    def update
      @added = @cinema.seats.find_by({ category: 'added' })
      @added.update({ seat_list: params[:added] })

      @not_added = @cinema.seats.find_by({ category: 'not_added' })
      @not_added.update({ seat_list: params[:notAdded] })

      redirect_to admin_cinema_seats_path
    end

    private
    def find_cinema
      @cinema = Cinema.find(params[:cinema_id])
    end
  end
end
