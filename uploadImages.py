import os
from pymongo import MongoClient
import gridfs

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["recommendations"]  # Your database name
fs = gridfs.GridFS(db)

# Folder Path
folder_path = "assets/"

# Iterate Through All Images in the Folder
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)
    
    # Check if the file is an image (optional)
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
        with open(file_path, "rb") as image_file:
            file_id = fs.put(image_file, filename=filename)  # Save file to GridFS
            print(f"Uploaded {filename} with ID: {file_id}")
    else:
        print(f"Skipped non-image file: {filename}")
