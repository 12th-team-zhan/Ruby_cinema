Rails.application.routes.draw do
  devise_for :users, :controllers => { omniauth_callbacks: "users/omniauth_callbacks" }
  resources :user_managements ,only: [:index , :edit , :update ,:delete ]

  
  root "test#index"
end
