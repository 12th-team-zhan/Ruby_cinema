# frozen_string_literal: true

class News < ApplicationRecord
  has_rich_text :description
end
