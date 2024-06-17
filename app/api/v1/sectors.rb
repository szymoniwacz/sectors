# frozen_string_literal: true

module V1
  module Sectors
    class Base < Grape::API
      resource :sectors do
        get do
          sectors = Sector.all
          present sectors, with: V1::Entities::Sector
        end
      end
    end
  end
end
