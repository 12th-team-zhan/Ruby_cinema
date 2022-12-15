module Admin
  class ShowtimesController < ApplicationController
    before_action :authenticate_user!
    # before_action :find_movie, only: %i[index new create destroy update]
    before_action :find_showtime, only: %i[destroy edit update]

    def index
      @showtimes = Showtime.all
    end

    def new
      @showtime = Showtime.new
      @cinemas = Cinema.select("name", "id").map{|cinema| [cinema.name, cinema.id]}
      @movies = Movie.select("name", "id").map{|movie| [movie.name, movie.id]}
    end

    def create
      # render html:params

      @showtime = Showtime.new(showtime_params)

      showtime_start = showtime_params[:started_at].to_datetime.to_i
      showtime_end = showtime_params[:end_at].to_datetime.to_i

      showtime_all = @showtimes.map {|data| [data.started_at.to_i, data.end_at.to_i]}
      current_time = Time.current.to_i 

      showtime_condition = showtime_all.map do |arr| 
        if showtime_start < arr[0] || showtime_start > arr[1]
          if showtime_start < arr[0]
            showtime_end < arr[0]
          else
            showtime_end > arr[1]
          end
        else
          false
        end
      end
      if showtime_condition.include?(false) ||    
         showtime_start > showtime_end ||      
         showtime_start < current_time || 
         showtime_start == showtime_end 
        redirect_to admin_movie_showtimes_path, notice: "場次設定有誤,請重新輸入"
      else
        @showtime.save
        redirect_to admin_showtimes_path, notice: "場次新增成功"
      end
    end

    def edit; end

    def update
      @showtimes = @movie.showtimes.all

      showtime_start = showtime_params[:started_at].to_datetime.to_i
      showtime_end = showtime_params[:end_at].to_datetime.to_i

      showtime_all = @showtimes.map {|data| [data.started_at.to_i, data.end_at.to_i]}
      current_time = DateTime.now.to_i
      
      showtime_condition = showtime_all.map do |arr| 
        if showtime_start < arr[0] || showtime_start > arr[1]
          if showtime_start < arr[0]
            showtime_end < arr[0]
          else
            showtime_end > arr[1]
          end
        else
          false
        end
      end
      if showtime_condition.include?(false) || 
         showtime_start > showtime_end ||      
         showtime_start < current_time || 
         showtime_start == showtime_end 
        redirect_to admin_movie_showtimes_path, notice: "場次更新設定有誤,請重新輸入"
      else
        @showtime.update(showtime_params)
        redirect_to admin_movie_showtimes_path, notice: "場次更新成功"
      end
    end

    def destroy
      @showtime.destroy
      redirect_to admin_movie_showtimes_path, notice: "刪除場次成功"
    end

    private
    def find_movie
      @movie = Movie.find(params[:movie_id])
    end

    def find_showtime
      @showtime = Showtime.find(params[:id])
    end

    def showtime_params
      params.require(:showtime).permit(:started_at, :end_at, :deleted_at, :movie_id, :cinema_id)
    end

  end
end
