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
#     This Python script facilitates uploading images and associated metadata to a MongoDB database using GridFS. 
#     It processes images and metadata for various product categories, storing image data in GridFS and metadata 
#     in corresponding MongoDB collections. The script is designed to work within a structured folder setup, 
#     ensuring smooth organization and upload of raw and categorized image assets.

# Features:
#     - Uploads categorized images along with metadata into MongoDB.
#     - Stores large image files efficiently using GridFS.
#     - Dynamically processes folders and files for various categories.
#     - Error handling for missing images or incorrect metadata entries.
#     - Supports uploading uncategorized raw images to a separate GridFS instance.

# Dependencies:
#     - Python version: 3.11.0
#     - pymongo: MongoDB driver for Python, used for database interactions.
#     - GridFS: MongoDB file storage specification, used for storing large files.
#     - json: Standard library for parsing and handling metadata files.
#     - os: Standard library for navigating and managing file system paths.

# File Paths:
#     - `assets_dir`: Root directory for categorized image folders.
#     - `metadata_file`: Path to the JSON file containing metadata for images.

# Instructions to Run:
#     - Ensure MongoDB is running and the database `EcommerceSite` is properly configured.
#     - Place images in the `assets` directory organized by category.
#     - Provide a `metadata.json` file in the root directory with details about the images.
#     - Run this script with `python <script_name>.py`.

# Example Metadata File Format:
#     ```json
#     {
#         "category1": [
#             {"id": "001", "name": "Product1", "price": "10.99", "description": "Description of Product1", "delivery": "Free"}
#         ]
#     }
#     ```

# To Use:
#     - Recommended for developers managing image uploads and metadata storage for e-commerce platforms.
#     - Ensure proper structure and naming conventions for assets and metadata files.
#     - Customize MongoDB collection names and paths as per your project requirements.

import os  # Provides utilities to interact with the operating system
import json  # Used to handle JSON files for reading metadata
import pymongo  # MongoDB client for Python to interact with MongoDB
from gridfs import GridFS  # GridFS module for handling large files in MongoDB

# MongoDB setup
client = pymongo.MongoClient("mongodb://localhost:27017/")  # Connect to the MongoDB server at localhost on default port 27017
db = client["EcommerceSite"]  # Access the "EcommerceSite" database
fs = GridFS(db)  # Create a GridFS instance for storing large files in the default "fs" collection
# Separate GridFS instances for different collections
fs_recommended = GridFS(db, collection="recommended")  # Create another GridFS instance for the "recommended" collection

# File paths
assets_dir = "assets"  # Define the root directory for image assets
metadata_file = "metadata.json"  # Path to the JSON file containing metadata about the images

# Load metadata
with open(metadata_file, 'r') as file:  # Open the metadata JSON file in read mode
    metadata = json.load(file)  # Parse the JSON content into a Python dictionary

# Function to upload images with metadata
def upload_images_with_metadata():
    # Iterate over each category and its items in the metadata
    for category, items in metadata.items():
        folder_path = os.path.join(assets_dir, category.capitalize())  # Construct the folder path for the category
        for item in items:  # Loop through each item in the category
            try:
                # Construct the path to the image file based on its ID
                image_path = os.path.join(folder_path, f"{item['id']}.png")
                if os.path.exists(image_path):  # Check if the image file exists
                    with open(image_path, 'rb') as img_file:  # Open the image file in binary read mode
                        # Upload the image to GridFS and get its file ID
                        file_id = fs.put(img_file, filename=f"{item['name']}.png")
                        # Insert metadata along with the image's file ID into the respective MongoDB collection
                        db[category].insert_one({**item, "image_id": file_id})
                else:
                    print(f"Image not found: {image_path}")  # Print an error message if the image is missing
            except Exception as e:
                # Handle any errors that occur during the upload process
                print(f"Error uploading {item['name']}: {e}")
    print("Images with metadata uploaded successfully!")  # Confirm successful upload of images with metadata

# Function to upload raw images to the "recommended" GridFS collection
def upload_raw_images(folder_name):
    folder_path = os.path.join(assets_dir, folder_name)  # Construct the folder path for raw images
    for filename in os.listdir(folder_path):  # Iterate over all files in the folder
        if filename.endswith(".png"):  # Process only files with a ".png" extension
            image_path = os.path.join(folder_path, filename)  # Construct the full path of the image
            with open(image_path, 'rb') as img_file:  # Open the image file in binary read mode
                # Upload the image to the "recommended" GridFS collection
                fs_recommended.put(img_file, filename=filename)
    print(f"Images from {folder_name} uploaded successfully!")  # Confirm successful upload of raw images

# Call the function to upload images with metadata
upload_images_with_metadata()

# Call the function to upload raw images from the "Recommended" folder
upload_raw_images("Recommended")
