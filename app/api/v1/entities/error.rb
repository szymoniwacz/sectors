# frozen_string_literal: true

module V1
  module Entities
    class Error < Grape::Entity
      expose :status
      expose :message
      expose :details
    end
  end
end
