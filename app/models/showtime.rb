class Showtime < ApplicationRecord
  acts_as_paranoid

  #relationship
  belongs_to :movie
  
end
