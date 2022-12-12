# frozen_string_literal: true

class MoviesController < ApplicationController
  def index
    @user = User.new
    @movie = Movie.all
  end

  def root
    @user = User.new
  end
end
