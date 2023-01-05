# frozen_string_literal: true

class Showtime < ApplicationRecord
  acts_as_paranoid

  # relationship
  belongs_to :movie
  belongs_to :cinema
  has_many :ticket
  scope :includes_id, ->(showtimeid) {
          includes([:movie, { cinema: :theater }]).where(id: showtimeid).references(:movie, :cinema).first
        }
end
