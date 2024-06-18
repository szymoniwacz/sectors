# frozen_string_literal: true

class Sector < ApplicationRecord
  has_many :user_sectors
  has_many :users, through: :user_sectors
  belongs_to :parent, class_name: 'Sector', optional: true
  has_many :children, class_name: 'Sector', foreign_key: :parent_id

  before_save :set_translation_key

  validates :name, presence: true, uniqueness: { scope: :parent_id }

  def set_translation_key
    self.translation_key = name.downcase.gsub(/::/, '/')
                               .gsub(/&/, 'and')
                               .gsub(/[^0-9a-z ]/i, '')
                               .tr(' ', '_')
  end
end
