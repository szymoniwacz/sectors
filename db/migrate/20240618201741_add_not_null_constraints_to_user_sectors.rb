# frozen_string_literal: true

class AddNotNullConstraintsToUserSectors < ActiveRecord::Migration[7.1]
  def change
    change_column_null :user_sectors, :user_id, false
    change_column_null :user_sectors, :sector_id, false
  end
end
