class MovieTheater < ApplicationRecord
  belongs_to :movie
  belongs_to :theater
end
