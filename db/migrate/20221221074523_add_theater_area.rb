# frozen_string_literal: true

class AddTheaterArea < ActiveRecord::Migration[6.1]
  def change
    add_column :theaters, :area, :integer
  end
end
