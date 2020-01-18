Rails.application.routes.draw do
  devise_for :users
  root "posts#index"
  resources :users, only: [:new, :edit]
  resources :posts, only: [:new, :create, :edit, :ahow] do
  end
end
