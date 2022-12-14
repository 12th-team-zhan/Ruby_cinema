# frozen_string_literal: true

module Admin
  class NewsController < AdminController
    before_action :find_news, only: %i[show edit update destroy]

    def index
      @news = News.all.order(id: :desc)
    end

    def new
      @news = News.new
    end

    def create
      @news = current_user.news.create(params_news)
      if @news.save
        redirect_to admin_news_index_path, notice: '成功新增消息'
      else
        render :new
      end
    end

    def edit; end

    def update
      if @news.update(params_news)
        redirect_to admin_news_index_path
      else
        render :edit
      end
    end

    def destroy
      @news.destroy
      redirect_to admin_newss_path
    end

    private

    def find_news
      @news = News.find(params[:id])
    end

    def params_news
      params.require(:news).permit(:title, :description, :user_id, :deleted_at).merge(edit_user_id: current_user.id)
    end
  end
end
