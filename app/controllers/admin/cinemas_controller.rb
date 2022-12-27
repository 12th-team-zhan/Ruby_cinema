# frozen_string_literal: true

module Admin
  class CinemasController < ApplicationController
    before_action :find_theater, only: %i[index new create]
    before_action :find_cinema, only: %i[edit update destroy]
    def index
      @cinemas = @theater.cinemas.order(id: :desc)
    end

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
      if @cinema.update(cinema_params)
        redirect_to admin_theater_cinemas_path(@cinema.theater_id), notice: '成功更新影廳資訊'
      else
        render :edit
      end
    end

    def destroy
      @cinema.destroy
      redirect_to admin_theater_cinemas_path(@cinema.theater_id), notice: '影廳已刪除'
    end

    private

    def cinema_params
      params.require(:cinema).permit(:name, :max_row, :max_column, :regular_price, :concession_price, :disability_price, :elderly_price)
    end

    def find_cinema
      @cinema = Cinema.find(params[:id])
    end

    def find_theater
      @theater = Theater.find(params[:theater_id])
    end
  end
end
