# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/sessions' }, skip: :sessions

  as :user do
    post '/users/sign_in', to: 'devise/sessions#create', as: :user_session
    delete '/users/sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
    get '/users', to: 'devise/registrations#new'
  end

  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  resources :movies, only: %i[index show]
  resources :news, only: %i[index show]
  resources :theaters, only: %i[index show]
  resources :movies, only: %i[index show]

  resources :orders do
    member do
      patch :cancel
    end
  end

  resources :tickets, only: %i[index show new create destroy] do
    member do
      get :pay
    end
    collection do
      post :checkout
    end
  end

  resources :find_showtimes, only: %i[index] do
    collection do
      get 'search'
      post 'add_movie_list'
      post 'add_showtime_list'
    end
  end

  namespace :admin do
    resources :users, only: %i[index edit update delete]
    resources :news
    resources :orders

    resources :theaters, except: %i[show] do
      resources :cinemas, only: %i[index new create]
    end
    resources :cinemas, only: %i[edit update destroy] do
      resources :seats, only: %i[index new create]
      get "/seats/edit", to: "seats#edit"
      patch "/seats/update", to: "seats#update"
    end

    resources :movies do
      member do
        delete :delete_images
        post :create_movie_poster
      end
      resource :movie_theater, only: %i[create destroy]
      resources :showtimes, only: %i[index create destroy]
    end
    resources :showtimes, only: %i[show]
  end

  resources :ticketing, only: %i[show] do
    collection do
      get :pay
      get :select_tickets
      get :select_seats
      post :seat_reservation, to: 'ticketing#seat_reservation'
    end
  end

  namespace :api do
    namespace :v1 do
      get 'movie_list', to: 'getdata#movie_list'
      post 'theater_list', to: 'getdata#theater_list'
      post 'showtime_list', to: 'getdata#showtime_list'
      post 'selected_tickets', to: 'getdata#selected_tickets'
      get 'selected_tickets', to: 'getdata#selected_tickets'
      post 'cinema_list', to: 'getdata#cinema_list'
    end
  end

  root 'movies#root'
end
