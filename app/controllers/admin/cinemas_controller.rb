module Admin
  class Admin::CinemasController < ApplicationController
    before_action :find_cinema, only: [:show, :edit, :update, :destroy]

    def index
      @cinemas = Cinema.all
    end

    def show
    end

    def new
      @cinema = Cinema.new
    end

    def create
      @cinema = Cinema.new(cinema_params)

      if @cinema.save
        redirect_to new_admin_cinema_seat_path(@cinema), notice: '成功新增影廳'
      else
        render :new
      end
    end

    def edit
    end

    def update
      if @cinema.update(cinema_params)
        redirect_to admin_cinemas_path, notice: '成功更新影廳資訊'
      else
        render :edit
      end
    end

    def destroy
      @cinema.destroy
      redirect_to admin_cinemas_path, notice: '影廳已刪除'
    end

    private
    def cinema_params
      params.require(:cinema).permit(:name, :max_row, :max_column)
    end

    def find_cinema
      @cinema = Cinema.find(params[:id])
    end
  end
end