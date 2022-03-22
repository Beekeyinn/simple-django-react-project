from datetime import datetime
import os,re

def get_file_name(filepath):
    base_name = os.path.basename(filepath)
    print("Basename of file is:" ,base_name)
    name, ext = os.path.splitext(base_name)
    print(f"name:-{name} and extension{ext}")
    return name, ext

def upload_image_path(instance, filename):
    print(instance, filename)
    new_filename = re.sub("[\s:.]","-",str(datetime.now())) #changing datetime into string by replacing space : and . with hyphen 
    name, ext = get_file_name(filename)
    final_name = f"{name}{new_filename}{ext}"
    print(final_name)
    return f"media/product/image/{final_name}"