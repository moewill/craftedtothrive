from flask import Flask

def create_app():
    app = Flask(__name__)
    
    @app.route("/")
    def hello():
        return {"message": "Hello from Flask backend!"}
    
    @app.route("/health")
    def health():
        return {"status": "healthy"}
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)