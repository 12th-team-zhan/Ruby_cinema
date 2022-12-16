# frozen_string_literal: true

module Api
  module V1
    class GetdataController < ApplicationController
      def movie_list
        movie_list = Movie.select("name")
        render json: movie_list
      end

      def theater_list
        theater_list = Movie.find(params[:movie_id]).theaters.select("name, theater_id")
        render json: theater_list
      end

      def showtime_list
        movie_id = params[:movie_id]
        theater_id = params[:theater_id]
        @cinemas = Theater.find(params[:theater_id]).cinemas
      end
    end
  end
end
