class FindShowtimesController < ApplicationController
  def search
    render html:params
  end
end
