Rails.application.routes.draw do
  devise_for :users
  root "test#index"
end
