# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/sessions' }, skip: :sessions as :user do
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
    
    resources :movies do
      member do
        delete :delete_images
        post :create_movie_poster
      end
    end
    
    resources :showtimes
    resources :news
    resources :theaters
    
    resources :cinemas do
      resources :seats, only: %i[index new create]
    end
    
    resources :orders
  end

  namespace :api do
    namespace :v1 do
      get 'getMovieList', to: 'getdata#movie_list'
    end
  end
end
