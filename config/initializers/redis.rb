# frozen_string_literal: true

$redis = Redis.new(url: ENV.fetch("REDIS_URL") { "redis://localhost:6379" })
