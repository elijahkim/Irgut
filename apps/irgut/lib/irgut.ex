defmodule Irgut do
  @moduledoc """
  Irgut keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def evaluate(code) do
    GenServer.call(Irgut.Server, {:evaluate, code})
  end
end
