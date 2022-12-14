# frozen_string_literal: true

module Admin
  class TheatersController < AdminController
    before_action :find_theater, only: %i[show edit update destroy]

    def index
      @theaters = Theater.all.order(id: :desc)
    end

    def new
      @theater = Theater.new
    end

    def create
      @theater = Theater.new(theater_params)
      if @theater.save
        append_exterior_img
        redirect_to admin_theaters_path, notice: '新增影城'
      else
        render :new
      end
    end

    def edit; end

    def update
      if @theater.update(theater_params)
        append_exterior_img
        redirect_to admin_theaters_path
      else
        render :edit
      end
    end

    def destroy
      @theater.destroy
      redirect_to admin_theaters_path
    end

    private

    def find_theater
      @theater = Theater.friendly.find(params[:id])
    end

    def theater_params
      params.require(:theater).permit(:name, 
                                      :area, 
                                      :address, 
                                      :phone, 
                                      :deleted_at,  
                                      images: [])
      params.require(:theater).permit(:name, :area, :address, :phone, :deleted_at, :description, :transportation)
    end

    def append_exterior_img
      return if params[:theater][:exterior_img].blank?

      @theater.exterior_img.attach(params[:theater][:exterior_img])
    end
  end
end
