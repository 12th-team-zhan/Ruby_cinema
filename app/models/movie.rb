# frozen_string_literal: true

class Movie < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  belongs_to :user

  enum film_rating: { g: 0, p: 1, pg: 2, pg15: 3, r: 4 }
end
