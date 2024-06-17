# frozen_string_literal: true

module V1
  module Entities
    class Sector < Grape::Entity
      expose :id
      expose :name
      expose :parent_id
    end
  end
end
