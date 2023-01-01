# frozen_string_literal: true

module TickingHelper

  def format_order(order_res)
    case order_res
    when 'success'
      html = " <h2><i class'fa-solid fa-thumbs-up me-3'></i>付款成功</h2>"
    when 'fail'
      html = " <h2><i class='fa-regular fa-face-sad-tear me-3'></i>付款失敗</h2>"
    end
    html.html_safe
  end
end
