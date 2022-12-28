# frozen_string_literal: true

module Admin
  module MoviesHelper
    def human_attribute_film_ratings
      Movie.film_ratings.map { |k,v| [Movie.human_attribute_name("film_rating.#{k}"), k] }
    end
  end
end