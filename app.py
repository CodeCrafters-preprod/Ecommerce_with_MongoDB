# META DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Developer details:
#     Name: Prachi Tavse, Harshita Jangde, Tanisha Priya
#     Role: Architect

# Version:
#     Version: V 1.0 (6 December 2024)
#     Developers: Prachi Tavse, Harshita Jangde, Tanisha Priya
#     Unit test: Pass
#     Integration test: Pass

# Description:
#     This Python script implements a Flask-based backend for an e-commerce platform. It includes routes to serve 
#     and manage assets like images and dynamic pages for various sections such as homepage, recommended products, 
#     order history, personal details, shop, cart, and more. The application leverages MongoDB and GridFS for 
#     efficient storage and retrieval of images. Separate GridFS instances are used for recommended products and 
#     general assets. The routes provide JSON responses for APIs, render HTML templates for frontend views, 
#     and handle image delivery dynamically using ObjectIds.

# Features:
#     - Dynamic retrieval and rendering of recommended products.
#     - Integration with MongoDB to fetch and serve image data.
#     - GridFS used for managing large image files efficiently.
#     - Routes for e-commerce functionalities (homepage, shop, cart, personal details, order history, etc.).
#     - Serving static assets like user profile pictures, logos, and category images.
#     - Error handling for missing images or files.

# Dependencies:
#     - Python version: 3.11.0
#     - Flask: A lightweight WSGI web application framework for building web applications.
#     - pymongo: MongoDB driver for Python.
#     - GridFS: File storage specification for MongoDB, used for managing large files.
#     - bson.objectid: Handles ObjectId generation and manipulation for MongoDB documents.
#     - os: Standard library for file and directory management.
#     - io: Handles byte streams for efficient file transmission.

# Instructions to Run:
#     - Install the required Python packages using `pip install flask pymongo`.
#     - Ensure MongoDB is running and the database `EcommerceSite` is properly configured.
#     - Place static assets in the `assets` directory at the project root.
#     - Run this script with `python app.py`.
#     - Access the application at `http://127.0.0.1:5000/`.

# To use:
#     - Recommended for developers building e-commerce platforms with dynamic image management.
#     - Include appropriate templates in the `templates` directory to render the frontend views.
#     - Modify the database configuration or collection names as needed to match your setup.

from flask import Flask, jsonify, render_template, send_from_directory, send_file
# Import Flask for building the web application, jsonify for returning JSON responses,
# render_template for rendering HTML templates, send_from_directory for serving static files,
# and send_file for sending file-like objects as responses.

from gridfs import GridFS
# Import GridFS for handling file storage in MongoDB.

import pymongo
# Import pymongo to interact with MongoDB.

from bson.objectid import ObjectId
# Import ObjectId to handle MongoDB's unique identifier for documents and files.

import os
# Import os for interacting with the file system (e.g., navigating directories).

from io import BytesIO
# Import BytesIO to handle binary file streams in memory (e.g., for image data).

# Initialize Flask app
app = Flask(__name__)

# MongoDB Configuration
client = pymongo.MongoClient("mongodb://localhost:27017/")  # Connect to MongoDB on localhost
db = client["EcommerceSite"]  # Access the "EcommerceSite" database
fs = GridFS(db)  # Default GridFS instance for handling file storage in MongoDB
fs_recommended = GridFS(db, collection="recommended")  # Separate GridFS instance for the "recommended" collection

# Endpoint to fetch images by category
@app.route('/images/<category>', methods=['GET'])
def get_images(category):
    """
    Fetches all images and their metadata for a specific category.
    """
    images = []  # Initialize a list to hold image metadata
    for item in db[category].find():  # Query all documents in the specified category collection
        image = fs.get(item["image_id"])  # Fetch the image file using its GridFS file ID
        # Add image metadata and URL to the response
        images.append({
            "id": item["id"],
            "name": item["name"],
            "price": item["price"],
            "description": item["description"],
            "delivery": item["delivery"],
            "image_url": f"/image/{item['image_id']}"  # URL to fetch the image
        })
    return jsonify(images)  # Return the list of images as JSON

# Endpoint to serve individual images for order history
@app.route('/image/<image_id>', methods=['GET'])
def get_image(image_id):
    """
    Serves an image from the default GridFS collection by its ObjectId.
    """
    try:
        file = fs.get(ObjectId(image_id))  # Fetch the image file from GridFS using its ObjectId
        return send_file(BytesIO(file.read()), mimetype='image/png')  # Return the image with PNG format
    except Exception as e:
        return jsonify({"error": str(e)}), 404  # Return error if the image is not found

# Endpoint to serve individual images for recommended products
@app.route('/recommended_image/<image_id>', methods=['GET'])
def get_recommended_image(image_id):
    """
    Serves an image from the "recommended" GridFS collection by its ObjectId.
    """
    try:
        file = fs_recommended.get(ObjectId(image_id))  # Fetch the image file from "recommended" GridFS
        return send_file(BytesIO(file.read()), mimetype='image/png')  # Return the image with PNG format
    except Exception as e:
        return jsonify({"error": str(e)}), 404  # Return error if the image is not found

# Serve static assets like logos or user profile images
@app.route('/assets/<path:filename>')
def serve_assets(filename):
    """
    Serves static assets from the "assets" directory.
    """
    assets_dir = os.path.join(os.getcwd(), 'assets')  # Construct the path to the assets directory
    return send_from_directory(assets_dir, filename)  # Serve the requested file from assets

# Homepage route
@app.route('/')
def homepage():
    """
    Displays the homepage with a list of recommended image IDs.
    """
    recommended_files = fs_recommended.find()  # Fetch all files from the "recommended" GridFS collection
    recommended_image_ids = [str(image._id) for image in recommended_files]  # Collect their ObjectIds as strings
    return render_template('homepage.html', image_ids=recommended_image_ids)  # Render homepage with image IDs

# Route for recommended products
@app.route('/recommended')
def recommended():
    """
    Displays the recommended products page.
    """
    recommended_files = fs_recommended.find()  # Fetch files from the "recommended" GridFS collection
    recommended_image_ids = [str(image._id) for image in recommended_files]  # Collect ObjectIds
    return render_template('recommended.html', image_ids=recommended_image_ids)  # Render the recommended products page

# Route for order history
@app.route('/order_history')
def order_history():
    """
    Displays the order history page with a list of order-related image IDs.
    """
    order_files = fs.find()  # Fetch files from the default GridFS collection
    order_image_ids = [str(image._id) for image in order_files]  # Collect ObjectIds
    return render_template('order_history.html', image_ids=order_image_ids)  # Render the order history page

# Route for personal details page
@app.route('/personal_details')
def personal_details():
    """
    Displays the personal details page.
    """
    return render_template('personal_details.html')

# Route for shop page
@app.route('/shop')
def shop():
    """
    Displays the shop page.
    """
    return render_template('shop.html')

# Route for cart page
@app.route('/cart')
def cart():
    """
    Displays the cart page.
    """
    return render_template('cart.html')

# Route for the about page
@app.route('/about')
def about():
    """
    Displays the about page.
    """
    return render_template('about.html')

# Route for the contact page
@app.route('/contact')
def contact():
    """
    Displays the contact page.
    """
    return render_template('contact.html')

# Route for the privacy policy page
@app.route('/privacypolicy')
def privacypolicy():
    """
    Displays the privacy policy page.
    """
    return render_template('privacypolicy.html')

# Route for the refund policy page
@app.route('/refundpolicy')
def refundpolicy():
    """
    Displays the refund policy page.
    """
    return render_template('refundpolicy.html')

# Route for the terms and conditions page
@app.route('/terms')
def terms():
    """
    Displays the terms and conditions page.
    """
    return render_template('terms.html')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode for easier development