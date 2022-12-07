class Admin::SeatsController < ApplicationController
    def new
    end

    def create
        seats = params[:seats]
        p seats
        render json: {status: "ok"}
    end
    
end
