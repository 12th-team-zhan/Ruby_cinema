# frozen_string_literal: true

class MoviesController < ApplicationController
  before_action :find_movie, only: %i[show]

  def index
    @movie = Movie.all
  end

  def root
    @movies = Movie.all
    @news = News.all.order(created_at: :desc).limit(6)
    @theater_areas = Theater.areas
  end

  def show
    @cinema_list = Showtime.where("movie_id = ? AND started_at > (?)", @movie.id, Time.current).pluck(:cinema_id).uniq
    @theater_list = Theater.joins(:cinemas).where(:cinemas => {id: @cinema_list}).uniq
  end

  private

  def find_movie
    @movie = Movie.friendly.find(params[:id]) 
  end

end
