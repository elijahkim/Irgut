defmodule IrgutWeb.RoomController do
  use IrgutWeb, :controller

  def show(conn, _params) do
    render conn, "show.html"
  end
end
