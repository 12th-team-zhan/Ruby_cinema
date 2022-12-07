# frozen_string_literal: true

module Admin
  class MoviesController < ApplicationController
    before_action :authenticate_user!
    before_action :current_user_is_staff
    before_action :find_movie, only: %i[show edit update]

    def index
      @movies = Movie.all
    end

    def new
      @movie = Movie.new
    end

    def show; end

    def edit; end

    def update
      if @movie.update(movie_params)
        redirect_to admin_movies_path, notice: '成功修改'
      else
        render :edit
      end
    end

    def create
      @movie = current_user.movies.create(movie_params)

      if @movie.save
        redirect_to admin_movies_path, notice: '成功新增電影！'
      else
        render :new
      end
    end

    private

    def find_movie
      @movie = Movie.find(params[:id])
    end

    def movie_params
      params.require(:movie).permit(:name, :eng_name, :duration, :film_rating, :director, :actor, :debut_date,
                                    :description)
    end
  end
end