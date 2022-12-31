# frozen_string_literal: true

class TheatersController < ApplicationController
  def index
    @theaters = Theater.all
  end

  def show
    @theater = Theater.find(params[:id])
  end
end
