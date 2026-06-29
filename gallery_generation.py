import os


folder = "img_web"

output = "gallery.html"


html = ""


for root, dirs, files in os.walk(folder):


    for photo in files:


        if photo.lower().endswith(
            (".jpg", ".jpeg", ".png", ".webp")
        ):


            if "stack" in photo:
                continue


            # получаем путь относительно папки img_web
            full_path = os.path.join(root, photo)

            image_path = full_path.replace("\\", "/")


            html += f"""
<img src="{image_path}">
"""



with open(output, "w", encoding="utf-8") as file:
    file.write(html)


print("Готово! Создан файл gallery.html")