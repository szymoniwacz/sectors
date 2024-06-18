# frozen_string_literal: true

class AddNotNullConstraintToSectorsName < ActiveRecord::Migration[7.1]
  def change
    change_column_null :sectors, :name, false
  end
end
