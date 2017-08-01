defmodule IrgutWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  @doc """
  Authorize socket to subscribe and broadcast events on this channel & topic
  Possible Return Values
  `{:ok, socket}` to authorize subscription for channel for requested topic
  `:ignore` to deny subscription/broadcast on this channel
  for the requested topic
  """
  def join("room:lobby", message, socket) do
    Process.flag(:trap_exit, true)

    {:ok, socket}
  end

  def join("room:" <> private_subtopic, _message, socket) do
    {:ok, socket}
  end

  def terminate(reason, _socket) do
    Logger.debug"> leave #{inspect reason}"
    :ok
  end

  def handle_in("editor:update", %{"code" => code}, socket) do
    broadcast(socket, "editor:updated", %{body: code})
    {:noreply, socket}
  end

  def handle_in("editor:evaluate", %{"code" => code}, socket) do
    result = Irgut.evaluate(code)

    broadcast(socket, "editor:return", %{body: result})
    {:noreply, socket}
  end
end
