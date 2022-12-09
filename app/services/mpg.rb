# frozen_string_literal: true

class Mpg
  attr_accessor :info

  def initialize
    @key = ENV['MPG_KEY']
    @iv = ENV['MPG_IV']
    @mid = ENV['MPG_MERCHANT_ID']
    @info = {}
    set_info
  end

  def form_info
    {
      MerchantID: @mid,
      TradeInfo: trade_info,
      TradeSha: trade_sha,
      Version: '2.0'
    }
  end

  private

  def trade_info
    aes_encode(url_encoded_query_string)
  end

  def trade_sha
    sha256_encode(@key, @iv, trade_info)
  end

  def set_info
    info[:MerchantID] = @mid
    info[:TimeStamp] = Time.now.to_i
    info[:Version] = '2.0'
    info[:RespondType] = 'JSON'
    info[:MerchantOrderNo] = ''
    info[:Amt] = '10'
    info[:ReturnURL] = ENV['RETURN_URL']
    info[:NotifyURL] = ENV['NOTIFY_URL']
    info[:ItemDesc] = '電影票'
    info[:Email] = ''
    info[:LoginType] = 0
    info[:CREDIT] =  1,
                     info[:VACC] = 1
  end

  def url_encoded_query_string
    URI.encode_www_form(info)
  end

  def aes_encode(string)
    cipher = OpenSSL::Cipher.new('aes-256-cbc')
    cipher.encrypt
    cipher.key = @key
    cipher.iv = @iv
    cipher.padding = 0
    padding_data = add_padding(string)
    encrypted = cipher.update(padding_data) + cipher.final
    encrypted.unpack1('H*')
  end

  def add_padding(data, block_size = 32)
    pad = block_size - (data.length % block_size)
    data + (pad.chr * pad)
  end

  def sha256_encode(key, iv, trade_info)
    encode_string = "HashKey=#{key}&#{trade_info}&HashIV=#{iv}"
    Digest::SHA256.hexdigest(encode_string).upcase
  end
end
