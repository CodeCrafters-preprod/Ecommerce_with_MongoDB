# import os
# from pymongo import MongoClient
# import gridfs

# # MongoDB Connection
# client = MongoClient("mongodb://localhost:27017/")
# db = client["recommendations"]  # Your database name
# fs = gridfs.GridFS(db)

# # Folder Path
# folder_path = "assets/"

# # Iterate Through All Images in the Folder
# for filename in os.listdir(folder_path):
#     file_path = os.path.join(folder_path, filename)
    
#     # Check if the file is an image (optional)
#     if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
#         with open(file_path, "rb") as image_file:
#             file_id = fs.put(image_file, filename=filename)  # Save file to GridFS
#             print(f"Uploaded {filename} with ID: {file_id}")
#     else:
#         print(f"Skipped non-image file: {filename}")

import os
import json
import pymongo
from gridfs import GridFS

# MongoDB setup
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["EcommerceSite"]
fs = GridFS(db)
# Separate GridFS instances for different collections
fs_recommended = GridFS(db, collection="recommended")

# File paths
assets_dir = "assets"
metadata_file = "metadata.json"

# Load metadata
with open(metadata_file, 'r') as file:
    metadata = json.load(file)

def upload_images_with_metadata():
    for category, items in metadata.items():
        folder_path = os.path.join(assets_dir, category.capitalize())
        for item in items:
            try:
                image_path = os.path.join(folder_path, f"{item['id']}.png")
                if os.path.exists(image_path):
                    with open(image_path, 'rb') as img_file:
                        file_id = fs.put(img_file, filename=f"{item['name']}.png")
                        db[category].insert_one({**item, "image_id": file_id})
                else:
                    print(f"Image not found: {image_path}")
            except Exception as e:
                print(f"Error uploading {item['name']}: {e}")
    print("Images with metadata uploaded successfully!")


# Upload function
def upload_raw_images(folder_name):
    folder_path = os.path.join(assets_dir, folder_name)
    for filename in os.listdir(folder_path):
        if filename.endswith(".png"):
            image_path = os.path.join(folder_path, filename)
            with open(image_path, 'rb') as img_file:
                fs_recommended.put(img_file, filename=filename)
    print(f"Images from {folder_name} uploaded successfully!")

# Call upload functions
upload_images_with_metadata()
upload_raw_images("Recommended")
