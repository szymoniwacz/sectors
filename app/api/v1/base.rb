# frozen_string_literal: true

module V1
  class Base < Base
    version 'v1', using: :path

    rescue_from Grape::Exceptions::ValidationErrors do |e|
      error!({ error: 'Parameter missing or invalid', detail: e.message }, 400)
    end

    mount V1::Sectors::Base
    mount V1::Users::Base
  end
end
