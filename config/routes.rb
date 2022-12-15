# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/sessions' }, skip: :sessions

  as :user do
    post '/users/sign_in', to: 'devise/sessions#create', as: :user_session
    delete '/users/sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  root 'movies#root'
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
    resources :theaters
    resources :orders
    resources :showtimes

    resources :movies do
      member do
        delete :delete_images
        post :create_movie_poster
      end
    end
    
    resources :cinemas do
      resources :seats, only: %i[index new create]
      get "/seats/edit", to: 'seats#edit'
      patch "/seats/update", to: 'seats#update'
    end
  end

  namespace :api do
    namespace :v1 do
      get 'movie_list', to: 'getdata#movie_list'
      post 'theater_list', to: 'getdata#theater_list'
      post 'showtime_list', to: 'getdata#showtime_list'
    end
  end
end
