# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_12_28_134538) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "cinemas", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "deleted_at"
    t.integer "max_row", default: 1
    t.integer "max_column", default: 1
    t.bigint "theater_id"
    t.integer "regular_price", default: 0
    t.integer "concession_price", default: 0
    t.integer "elderly_price", default: 0
    t.integer "disability_price", default: 0
    t.index ["deleted_at"], name: "index_cinemas_on_deleted_at"
    t.index ["theater_id"], name: "index_cinemas_on_theater_id"
  end

  create_table "customers", id: :integer, default: nil, force: :cascade do |t|
    t.integer "c_id"
    t.string "name", limit: 50
    t.string "address", limit: 255
    t.string "phone", limit: 20
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "movie_theaters", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "theater_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["movie_id"], name: "index_movie_theaters_on_movie_id"
    t.index ["theater_id"], name: "index_movie_theaters_on_theater_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "name"
    t.string "eng_name"
    t.integer "duration"
    t.integer "film_rating", default: 0, null: false
    t.string "director"
    t.string "actor"
    t.date "debut_date"
    t.datetime "deleted_at"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "youtube_iframe"
    t.index ["user_id"], name: "index_movies_on_user_id"
  end

  create_table "news", force: :cascade do |t|
    t.string "title"
    t.bigint "user_id", null: false
    t.integer "edit_user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_news_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "serial"
    t.integer "status", default: 0
    t.integer "payment_method", default: 0
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "amount", default: 0
    t.string "slug"
    t.index ["slug"], name: "index_orders_on_slug", unique: true
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "seats", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "cinema_id"
    t.text "seat_list", default: [], array: true
    t.string "category", default: "added"
    t.index ["cinema_id"], name: "index_seats_on_cinema_id"
  end

  create_table "showtimes", force: :cascade do |t|
    t.datetime "started_at"
    t.datetime "end_at"
    t.datetime "deleted_at"
    t.integer "movie_id"
    t.integer "cinema_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["deleted_at"], name: "index_showtimes_on_deleted_at"
  end

  create_table "theaters", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "phone"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "area"
    t.index ["deleted_at"], name: "index_theaters_on_deleted_at"
  end

  create_table "tickets", force: :cascade do |t|
    t.string "seat"
    t.integer "status"
    t.string "serial"
    t.integer "category"
    t.datetime "deleted_at"
    t.integer "showtime_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "movie_name"
    t.string "cinema_name"
    t.string "theater_name"
    t.bigint "order_id"
    t.index ["order_id"], name: "index_tickets_on_order_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "fb_uid"
    t.string "fb_token"
    t.string "name"
    t.datetime "deleted_at"
    t.integer "role", default: 0
    t.string "provider"
    t.string "uid"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["fb_uid"], name: "index_users_on_fb_uid"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "movie_theaters", "movies"
  add_foreign_key "movie_theaters", "theaters"
  add_foreign_key "movies", "users"
  add_foreign_key "news", "users"
  add_foreign_key "orders", "users"
end
