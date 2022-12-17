# frozen_string_literal: true

class Movie < ApplicationRecord
  acts_as_paranoid

  # validates
  validates :name, presence: true
  validates :description, presence: true

  # relationships
  belongs_to :user
  has_one_attached :movie_poster
  has_many_attached :scene_images
  has_many :showtimes
  has_many :movie_theater
  has_many :theaters, through: :movie_theater, source: :theater

  enum film_rating: { general: 0, parental_guidance: 1, parental_guidance12: 2, parental_guidance15: 3, restricted: 4 }
end
