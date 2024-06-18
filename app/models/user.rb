# frozen_string_literal: true

class User < ApplicationRecord
  has_many :user_sectors
  has_many :sectors, through: :user_sectors

  validates :name, presence: true, uniqueness: true
  validates :sectors, presence: true
  validates :agree_to_terms, inclusion: { in: [true, false] }
end
