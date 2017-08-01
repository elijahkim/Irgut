defmodule IrgutWeb.PageController do
  use IrgutWeb, :controller

  def index(conn, _params) do
    hash =
      :crypto.strong_rand_bytes(32)
      |> Base.url_encode64
      |> binary_part(0, 32)

    redirect(conn, to: room_path(conn, :show, hash))
  end
end
