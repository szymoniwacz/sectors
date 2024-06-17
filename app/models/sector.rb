# frozen_string_literal: true

class Sector < ApplicationRecord
  has_many :user_sectors
  has_many :users, through: :user_sectors

  belongs_to :parent, class_name: 'Sector', optional: true
  has_many :children, class_name: 'Sector', foreign_key: :parent_id
end
