# frozen_string_literal: true

class NewsController < ApplicationController
    before_action :find_news, only: %i[show]
    def show; end

    def index
        @news = News.all.order(created_at: :desc)
    end

    private
    
    def find_news
        @news = News.find(params[:id])
    end
  end