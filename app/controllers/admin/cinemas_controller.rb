class Admin::CinemasController < ApplicationController
    def index
        @cinemas = Cinema.all
    end

    def new
        @cinema = Cinema.new
    end

    def create
        @cinema = Cinema.new(cinema_params)

        if @cinema.save
            redirect_to new_admin_cinema_seat_path(@cinema), notice: '成功新增影廳'
        else
            render(:new)
        end
    end

    private
    def cinema_params
        params.require(:cinema).permit(:name, :max_row, :max_column)
    end
end
