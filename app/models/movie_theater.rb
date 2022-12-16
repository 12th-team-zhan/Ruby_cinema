# frozen_string_literal: true

class MovieTheater < ApplicationRecord
  belongs_to :movie
  belongs_to :theater
end
