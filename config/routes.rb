# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/sessions' }, skip: :sessions
  
  as :user do
    post '/users/sign_in', to: 'devise/sessions#create', as: :user_session
    delete '/users/sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  resources :movies, only: %i[index show]
  resources :news, only: %i[index show]
  resources :theaters, only: %i[index show]

  resources :orders do
    member do
      patch :cancel
    end
  end

  namespace :admin do
    resources :users, only: %i[index edit update delete]
    resources :news
    resources :orders

    resources :theaters do
      resources :cinemas, only: [:index, :new, :create]
    end
    resources :cinemas, only: [:show, :edit, :update, :destroy] do
      resources :seats, only: %i[index new create]
      get "/seats/edit", to: 'seats#edit'
      patch "/seats/update", to: 'seats#update'
    end

    resources :movies do
      member do
        delete :delete_images
        post :create_movie_poster
      end

      resources :showtimes, only: [:index, :new, :create, :destroy]
    end
    resources :showtimes, only: [:show, :edit, :update]

  end

  namespace :api do
    namespace :v1 do
      get 'movie_list', to: 'getdata#movie_list'
      post 'theater_list', to: 'getdata#theater_list'
      post 'showtime_list', to: 'getdata#showtime_list'
      post 'go_buy_tickets', to: 'getdata#go_buy_tickets'
    end
  end

  root 'movies#root'
end