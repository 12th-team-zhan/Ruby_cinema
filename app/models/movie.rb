# frozen_string_literal: true

class Movie < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  belongs_to :user
  has_one_attached :movie_poster
  has_many_attached :scene_images

  enum film_rating: { general: 0, parental_guidance: 1, parental_guidance12: 2, parental_guidance15: 3, restricted: 4 }
end
