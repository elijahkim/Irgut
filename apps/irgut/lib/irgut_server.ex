defmodule Irgut.Server do
  use GenServer
  @name __MODULE__

  def start_link do
    GenServer.start_link(@name, [], name: @name)
  end

  def init([]) do
    {:ok, device} = StringIO.open ""
    :erlang.group_leader(device, self())

    {:ok, device}
  end

  def handle_call({:evaluate, code}, _from, device) do
    evaluate(code)

    {:reply, StringIO.flush(device), device}
  end

  defp evaluate(code_string) do
    try do
      {result, binding} =
        code_string
        |> Code.eval_string
    rescue
      exception -> IO.inspect(Exception.message(exception))
    end
  end
end
