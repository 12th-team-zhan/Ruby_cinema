# frozen_string_literal: true

module Api
  module V1
    class GetdataController < ApplicationController
      def movie_list
        movie_list = Movie.select('name')
        render json: movie_list
      end

      def theater_list
        theater_list = Movie.find(params[:movie_id]).theaters.select('name, theater_id')
        render json: theater_list
      end

      def cinema_list
        cinema_list = Cinema.where(theater_id: params[:theater_id])
        render json: cinema_list
      end

      def showtime_list
        @cinemas = Theater.find(params[:theater_id]).cinemas.pluck(:id)
        showtime_date = Showtime.where('movie_id = ? AND cinema_id IN (?) AND started_at > (?)', params[:movie_id], @cinemas, Time.now.to_s(:db)).pluck(:started_at,
                                                                                                                                                             :id).map do |showtime, id|
          [showtime.strftime('%Y-%m-%d'), showtime.strftime('%I:%M %p'), id]
        end
          render json: showtime_date
      end

      def selected_tickets
        user_selected = {}
        $redis.smembers("showtime_#{params[:showtime_id]}").each do |user_id|
          user_selected[user_id] = $redis.smembers(user_id)
        end
        render json: user_selected
      end
    end
  end
end
