# frozen_string_literal: true

require_relative 'helpers/session_helper'

class Base < Grape::API
  helpers ::SessionHelper

  prefix 'api'
  format :json

  rescue_from Grape::Exceptions::ValidationErrors do |e|
    error!({ error: 'Parameter missing or invalid', detail: e.message }, 400)
  end

  mount V1::Base
end
