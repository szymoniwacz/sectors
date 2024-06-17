# frozen_string_literal: true

class UserSector < ApplicationRecord
  belongs_to :user
  belongs_to :sector
end
