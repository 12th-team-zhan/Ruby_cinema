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
    @showtimes = Showtime.where("movie_id = ? AND started_at > ?", params[:id], Time.zone.now.to_s(:db))

    
    @cinema_list = Showtime.where("movie_id = ? AND started_at > ?", params[:id], Time.zone.now.to_s(:db)).pluck(:cinema_id)
    @theater_list = Cinema.where("id IN (?)", @cinema_list).pluck(:theater_id).uniq.map{|theater| Theater.find(theater)}
  end

  private

  def find_movie
    @movie = Movie.find(params[:id])
  end
end
