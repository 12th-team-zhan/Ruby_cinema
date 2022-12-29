# frozen_string_literal: true

class AddMovieYoutubeLink < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :youtube_iframe, :text
  end
end
