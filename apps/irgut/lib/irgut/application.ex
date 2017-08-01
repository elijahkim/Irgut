defmodule Irgut.Application do
  @moduledoc """
  The Irgut Application Service.

  The irgut system business domain lives in this application.

  Exposes API to clients such as the `IrgutWeb` application
  for use in channels, controllers, and elsewhere.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      worker(Irgut.Server, [])
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Irgut.Supervisor)
  end
end
