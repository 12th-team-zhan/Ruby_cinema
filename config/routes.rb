# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/sessions' }

  root 'movies#index'
  resources :movies, only: %i[index show]
  resources :news, only: %i[index show]
  resources :theaters, only: %i[index show]
  namespace :admin do
    resources :users, only: %i[index edit update delete]
    resources :movies
    resources :showtimes
    resources :news
    resources :theaters

    resources :cinemas do
      resources :seats, only: %i[index new create]
    end
  end

  namespace :"api/v1" do
  end
end
