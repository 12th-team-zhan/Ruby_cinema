# frozen_string_literal: true

class SelectseatChannel < ApplicationCable::Channel
  @@select_seat = {}

  def subscribed
    stream_from 'selectseat_channel'
    @user_id = params[:id]
  end

  def self.speak(params)
    case params[:status]
    when 'selected'
      ActionCable.server.broadcast('selectseat_channel', { status: 'selected', seat_id: params[:seat_id],id: params[:id] })
      @@select_seat[params[:id]] = if (@@select_seat[params[:id]]).nil?
                                     [params[:seat_id]]
                                   else
                                     @@select_seat[params[:id]] << params[:seat_id]
                                   end

      Rails.logger.debug @@select_seat
    when 'cancel'
      ActionCable.server.broadcast('selectseat_channel', { status: 'cancel', seat_id: params[:seat_id],id: params[:id] })
      @@select_seat[params[:id]] = @@select_seat[params[:id]].delete(params[:seat_id])
    end
  end

  def self.channle_user_select_seat
    @@select_seat
  end

  def unsubscribed
    ActionCable.server.broadcast('selectseat_channel', { status: 'other_unsubscribed', id: @user_id })
    @@select_seat.delete(@user_id)
  end
end
