# frozen_string_literal: true

class Theater < ApplicationRecord
  acts_as_paranoid

  # validates
  validates :name, presence: true
  validates :area, presence: true
  validates :address, presence: true
  validates :phone, presence: true

  # relationship
  has_one_attached :exterior_img
  has_many :cinemas, dependent: :destroy
  has_many :movie_theater, dependent: :destroy
  has_many :movies, through: :movie_theater, source: :movie

  enum area: { north: 0, middle: 1, south: 2, east: 3 }
end
