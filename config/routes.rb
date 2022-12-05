Rails.application.routes.draw do
  devise_for :users, :controllers => { omniauth_callbacks: "users/omniauth_callbacks" }, controllers: { sessions: "users/sessions" }
  

  root "movies#index"
  resources :movies, only: [:index, :show]
  resources :news, only: [:index, :show]
  resources :theaters, only: [:index, :show]
  namespace :admin do
    resources :users ,only: [:index , :edit , :update ,:delete ]
    resources :movies
    resources :showtimes
    resources :news
    resources :theaters
  end
  namespace :"api/v1" do
  end  
end
