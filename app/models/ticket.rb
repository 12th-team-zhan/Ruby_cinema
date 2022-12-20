# frozen_string_literal: true

class Ticket < ApplicationRecord
  acts_as_paranoid

  belongs_to :showtime

  enum status: { unuses: 0, used: 1, no_avail: 2 }
  enum category: { regular_ticket: 0, concession_ticket: 1, elderly_ticket: 2, disability_ticket: 3 }

  validates :serial, presence: true
end
