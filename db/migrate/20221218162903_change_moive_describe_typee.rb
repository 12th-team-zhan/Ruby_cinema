# frozen_string_literal: true

class ChangeMoiveDescribeTypee < ActiveRecord::Migration[6.1]
  def change
    remove_column :movies, :description
  end
end
