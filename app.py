from flask import Flask, render_template, send_from_directory, send_file
import gridfs
from bson.objectid import ObjectId
import os
from flask_pymongo import PyMongo
from PIL import Image
import io

app = Flask(__name__)
# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/recommendations"  # Replace with your DB URI
mongo = PyMongo(app)

# Set up GridFS for storing images
fs = gridfs.GridFS(mongo.db)

@app.route('/get_image/<image_id>')
def get_image(image_id):
    # Retrieve image from MongoDB using its ObjectId
    image = fs.get(ObjectId(image_id))
    return send_file(io.BytesIO(image.read()), mimetype='image/png')

@app.route('/')
def homepage():
     # Retrieve image IDs (or filenames) from MongoDB
    # You can use a more advanced query to fetch only relevant images
    image_files = fs.find()  # This will get all files in GridFS
    image_ids = [str(image._id) for image in image_files]  # Collect image IDs
    # Render the page with the list of image IDs
    return render_template('homepage.html', image_ids=image_ids)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    # Update the path to the directory where your assets are located
    assets_dir = os.path.join(os.getcwd(), 'assets')
    return send_from_directory(assets_dir, filename)

@app.route('/personal_details')
def personal_details():
    return render_template('personal_details.html')

@app.route('/recommended')
def recommended():
    # Retrieve image IDs (or filenames) from MongoDB
    # You can use a more advanced query to fetch only relevant images
    image_files = fs.find()  # This will get all files in GridFS
    image_ids = [str(image._id) for image in image_files]  # Collect image IDs
    # Render the page with the list of image IDs
    return render_template('recommended.html', image_ids=image_ids)

@app.route('/order_history')
def order_history():
    return render_template('order_history.html')

@app.route('/shop')
def shop():
    return render_template('shop.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/privacypolicy')
def privacypolicy():
    return render_template('privacypolicy.html')

@app.route('/refundpolicy')
def refundpolicy():
    return render_template('refundpolicy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')



if __name__ == '__main__':
    app.run(debug=True)
