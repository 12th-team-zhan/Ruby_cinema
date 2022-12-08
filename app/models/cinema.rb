class Cinema < ApplicationRecord
  validates :name, presence: true
    
  acts_as_paranoid

  # relationship
  has_many :seats
end
