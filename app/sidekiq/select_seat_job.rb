# frozen_string_literal: true

class SelectSeatJob
  include Sidekiq::Job

  def perform(status, showtime_id, seat_id, user_id)
    result = true
    if status == 'selected'
      $redis.smembers("showtime_#{showtime_id}").each do |id|
        result = false if $redis.smembers(id).include?(seat_id)
      end
    end
    SelectseatChannel.speak(status, showtime_id, seat_id, user_id, result)
  end
end
