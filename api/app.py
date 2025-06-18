from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from gilded_rose.gilded_rose import GildedRose
from gilded_rose.item import Item

DEFAULT_ITEMS = [
        Item("Aged Brie", 2, 0),
        Item("Elixir of the Mongoose", 5, 7),
        Item("Sulfuras, Hand of Ragnaros", 0, 80),
        Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ]

def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5182", "http://127.0.0.1:5182"]}})

    app.items = DEFAULT_ITEMS

    def _serialize(items):
        return [
            {"name": i.name, "sell_in": i.sell_in, "quality": i.quality} for i in items
        ]

    @app.route("/api/items", methods=["GET"])
    def get_items():
        return jsonify({"items": _serialize(app.items)})

    @app.route("/api/update-quality", methods=["POST"])
    def update_quality():
        gr = GildedRose(app.items)
        gr.update_quality()
        return jsonify({"items": _serialize(app.items)})

    @app.route("/")
    def index():
        return redirect("http://localhost:5182/")

    return app


if __name__ == "__main__":
    application = create_app()
    application.run(host="0.0.0.0", port=5000, debug=True)
