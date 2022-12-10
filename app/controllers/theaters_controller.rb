# frozen_string_literal: true

class TheatersController < ApplicationController
  def index
    @theaters = Theater.all
  end
end
