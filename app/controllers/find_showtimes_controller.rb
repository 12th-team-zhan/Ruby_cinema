# frozen_string_literal: true

class FindShowtimesController < ApplicationController
  def index
    @theater_areas = Theater.areas
  end

  def search
    start_time = "#{params[:showtime]} #{params[:startTime]}".to_datetime.to_s(:db)
    end_time = "#{params[:showtime]} #{params[:endTime]}".to_datetime.to_s(:db)

    @theater_areas = Theater.areas
    @theaters_list = Theater.where(area: params[:area]).pluck(:id)
    @movie = Movie.find_by(id: params[:movie_id])
    @showtimes = Showtime.joins(:cinema).where('theater_id IN (?) AND movie_id = ? AND started_at > (?) AND started_at > (?) AND started_at < (?)',
                                               @theaters_list, params[:movie_id], Time.current, start_time, end_time)
  end

  def add_movie_list
    @theaters = Theater.where(area: params[:area]).pluck(:id)
    movie_list = Movie.joins(:movie_theater).where(:movie_theater => {theater_id: @theaters}).pluck(:id, :name).uniq
    render json: movie_list
  end

  def add_showtime_list
    showtime_list = Showtime.where('movie_id = ? AND started_at > (?)', params[:movie_id], Time.current).pluck(
      :started_at, :id
    ).map do |showtime, id|
      [showtime.strftime('%Y-%m-%d'), id]
    end
    render json: showtime_list
  end
end
