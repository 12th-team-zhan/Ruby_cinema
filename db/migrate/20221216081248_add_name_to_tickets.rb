# frozen_string_literal: true

class AddNameToTickets < ActiveRecord::Migration[6.1]
  def change
    add_column :tickets, :movie_name, :string
    add_column :tickets, :cinema_name, :string
    add_column :tickets, :theater_name, :string
  end
end
