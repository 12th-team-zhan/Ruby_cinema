# frozen_string_literal: true

class MoviesController < ApplicationController
  def index
    @user = User.new
  end
end
