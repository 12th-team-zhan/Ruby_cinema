# frozen_string_literal: true

class AddCinemaIdToSeats < ActiveRecord::Migration[6.1]
  def change
    add_belongs_to :seats, :cinema
  end
end
