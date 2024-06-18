# frozen_string_literal: true

module V1
  module Sectors
    class Base < Grape::API
      resource :sectors do
        get do
          locale = params[:locale] || I18n.default_locale
          sectors = Sector.all.map do |sector|
            {
              id: sector.id,
              parent_id: sector.parent_id,
              name: I18n.t("sectors.#{sector.translation_key}", locale:)
            }
          end
          present sectors, with: V1::Entities::Sector
        end
      end
    end
  end
end
