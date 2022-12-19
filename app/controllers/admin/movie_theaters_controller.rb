# frozen_string_literal: true

module Admin
  class MovieTheatersController < ApplicationController
    before_action :find_movie
    before_action :find_theater

    def create
      @movie_theater = @movie.movie_theater.find_or_create_by(movie_id: params[:movie_id],
                                                              theater_id: params[:theater_id])
      redirect_to edit_admin_movie_path(@movie)
    end

    def destroy
      @movie.movie_theater.find_by(theater_id: params[:theater_id]).delete
      redirect_to edit_admin_movie_path(@movie)
    end

    private

    def find_movie
      @movie = Movie.find(params[:movie_id])
    end

    def find_theater
      @theater = Theater.find(params[:theater_id])
    end
  end
end
