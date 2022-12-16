# frozen_string_literal: true

class AddCinemasBelongsToTheater < ActiveRecord::Migration[6.1]
  def change
    add_belongs_to :cinemas, :theater
  end
end
