# frozen_string_literal: true

module V1
  module Entities
    class User < Grape::Entity
      expose :id
      expose :name
      expose :agree_to_terms
      expose :sector_ids
    end
  end
end
