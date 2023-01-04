# frozen_string_literal: true

class SelectseatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "selectseat_channel#{params[:showtime_id]}"
    @user_id = params[:id]
    @showtime_id = params[:showtime_id]
    $redis.sadd("showtime_#{@showtime_id}", @user_id)
  end

  def self.speak(status, showtime_id, seat_id, user_id, result)
    if result
      case status
      when 'selected'
        $redis.sadd(user_id, seat_id)
        $redis.expire(user_id, 600)
        ActionCable.server.broadcast("selectseat_channel#{showtime_id}",
                                     { status: 'selected', seat_id:, id: user_id })
      when 'cancel'
        $redis.srem(user_id, seat_id)
        ActionCable.server.broadcast("selectseat_channel#{showtime_id}",
                                     { status: 'cancel', seat_id:, id: user_id })
      end
    else
      ActionCable.server.broadcast("selectseat_channel#{showtime_id}",
                                   { status: 'fail', seat_id:, id: user_id })
    end
  end

  def unsubscribed
    ActionCable.server.broadcast("selectseat_channel#{@showtime_id}", { status: 'other_unsubscribed', id: @user_id })
    $redis.del(@user_id)
    $redis.srem("showtime_#{@showtime_id}", @user_id)
  end
end
