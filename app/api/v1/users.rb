# frozen_string_literal: true

module V1
  module Users
    class Base < Grape::API
      helpers do
        def current_user
          return nil unless session[:user_id].present?

          User.find(session[:user_id])
        end
      end

      resource :users do
        params do
          requires :name, type: String
          requires :agree_to_terms, type: Boolean
          requires :sector_ids, type: Array[Integer]
        end
        post do
          user = current_user || User.new
          if user.update!(name: params[:name], agree_to_terms: params[:agree_to_terms], sector_ids: params[:sector_ids])
            session[:user_id] = user.id
            present user, with: V1::Entities::User
          end
        rescue ActiveRecord::RecordInvalid => e
          error_details = user.errors.details.map do |attribute, details|
            { attribute: attribute, error: details.map { |detail| detail[:error] } }
          end
          error = { status: 422, message: I18n.t('errors.messages.validation_failed'), details: error_details }
          error!(V1::Entities::Error.represent(error), 422)
        end

        get :me do
          present current_user, with: V1::Entities::User
        end

        post :logout do
          session[:user_id] = nil if current_user

          status 204
        end
      end
    end
  end
end
