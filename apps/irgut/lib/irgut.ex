defmodule Irgut do
  @moduledoc """
  Irgut keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def evaluate(code_string) do
    try do
      {result, binding} =
        code_string
        |> Code.eval_string
    rescue
      exception -> IO.inspect Exception.message(exception)
    end
  end
end
