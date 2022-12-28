# frozen_string_literal: true

module Admin
  class SeatsController < AdminController
    before_action :find_cinema, only: %i[index new create edit update]

    def index
      @not_added = @cinema.seats.find_by({ category: 'not_added' })

      return unless @not_added.nil?

      redirect_to new_admin_cinema_seat_path(@cinema)
    end

    def new; end

    def create
      @added = @cinema.seats.new({ seat_list: params[:added], category: 'added' })
      @added.save

      @not_added = @cinema.seats.new({ seat_list: params[:notAdded], category: 'not_added' })
      @not_added.save

      redirect_to admin_theater_cinemas_path(@cinema.theater_id)
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

    def seat_params
      params.permit(:added, :notAdded)
    end

    def find_cinema
      @cinema = Cinema.find(params[:cinema_id])
    end
  end
end
