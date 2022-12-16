# frozen_string_literal: true

class Cinema < ApplicationRecord
  validates :name, presence: true
  validates :max_row, presence: true
  validates :max_column, presence: true

  acts_as_paranoid

  # relationship
  has_many :seats
  has_many :showtimes
  belongs_to :theater
  has_many :movies, through: :showtimes, source: :movie
  
end
