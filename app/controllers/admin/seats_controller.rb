# frozen_string_literal: true

module Admin
  class SeatsController < ApplicationController
    before_action :find_cinema, only: %i[index new create]

    def index
      @not_added = @cinema.seats.find_by({category: 'not_added'})
    end

    def new; end

    def create
      @added = @cinema.seats.new({ seat_list: params[:added], category: 'added' })
      @added.save

      @not_added = @cinema.seats.new({ seat_list: params[:notAdded], category: 'not_added' })
      @not_added.save

      redirect_to admin_movies_path
    end

    private

    def find_cinema
      @cinema = Cinema.find(params[:cinema_id])
    end
  end
end
