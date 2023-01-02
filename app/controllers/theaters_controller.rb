# frozen_string_literal: true

class TheatersController < ApplicationController
  def index
    @theaters = Theater.all
  end

  def show
    @theater = Theater.find(params[:id])
    @movies = Movie.joins(:movie_theater).where(:movie_theater =>{theater_id: @theater.id})
  end
end
