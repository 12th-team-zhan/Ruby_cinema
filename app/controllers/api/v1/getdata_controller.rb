# frozen_string_literal: true

module Api
  module V1
    class GetdataController < ApplicationController
      def movie_list
        movies = Movie.all
        movie_list = []
        movies.each do |movie|
          movie_list << movie.name
        end
        render json: movie_list
      end
    end
  end
end
