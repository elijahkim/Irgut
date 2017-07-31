# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :irgut_web,
  namespace: IrgutWeb

# Configures the endpoint
config :irgut_web, IrgutWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "VdvlHclylVaa147Rp/zLb+6wrnAOIrZFUsoGxNunkV+0NOWgcbtFOf+bWut3NiJ6",
  render_errors: [view: IrgutWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: IrgutWeb.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :irgut_web, :generators,
  context_app: :irgut

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
