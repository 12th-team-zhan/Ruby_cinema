# frozen_string_literal: true

module Admin
  class TheatersController < ApplicationController
    before_action :find_theater, only: %i[show edit update destroy]

    def index
      @theaters = Theater.all
    end

    def show; end

    def new
      @theater = Theater.new
    end

    def create
      @theater = Theater.new(params_theater)
      if @theater.save
        append_exterior_img
        redirect_to admin_theaters_path, notice: '新增影城'
      else
        render :new
      end
    end

    def edit; end

    def update
      if @theater.update(params_theater)
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
      @theater = Theater.find(params[:id])
    end

    def params_theater
      params.require(:theater).permit(:name, :address, :phone, :deleted_at)
    end

    def append_exterior_img
      return if params[:theater][:exterior_img].blank?

      @theater.exterior_img.attach(params[:theater][:exterior_img])
    end
  end
end
