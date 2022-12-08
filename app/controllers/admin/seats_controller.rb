class Admin::SeatsController < ApplicationController
    before_action :find_cinema, only: [:new, :create]

    def new
    end

    def create
        seats = JSON.parse(params[:seats].to_json)
        seats.each do |k, v|
            @seat = @cinema.seats.new({row: v[0], number: v[1]})
            @seat.save
        end
        redirect_to(root_path, status: 301)
    end

    private
    def find_cinema
      @cinema = Cinema.find(params[:cinema_id])
    end
end
