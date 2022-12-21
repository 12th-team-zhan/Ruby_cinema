# frozen_string_literal: true

class MoviesController < ApplicationController
  before_action :find_movie, only: %i[show]

  def index
    @user = User.new
    @movie = Movie.all
  end

  def root
    @user = User.new
    @movies = Movie.all
    @news = News.all.order(created_at: :desc).limit(6)
    @theater_areas = Theater.areas
  end

  def show; end

  private

  def find_movie
    @movie = Movie.find(params[:id])
  end
end
