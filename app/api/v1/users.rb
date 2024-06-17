# frozen_string_literal: true

module V1
  module Users
    class Base < Grape::API
      resource :users do
        params do
          requires :name, type: String
          requires :agree_to_terms, type: Boolean
          requires :sector_ids, type: Array[Integer]
        end
        post do
          user = User.create!(
            name: params[:name],
            agree_to_terms: params[:agree_to_terms]
          )
          user.sector_ids = params[:sector_ids]
          session[:user_id] = user.id
          user
        end

        get :me do
          user = User.find(session[:user_id])
          present user, with: V1::Entities::User
        end
      end
    end
  end
end
