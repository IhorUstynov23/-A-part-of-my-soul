import os


# Папка с городами
folder = "img/travel"


# Файл куда сохранить результат
output = "gallery.html"


html = ""


# перебираем города
for city in os.listdir(folder):

    city_path = os.path.join(folder, city)


    # если это не папка - пропускаем
    if not os.path.isdir(city_path):
        continue


    html += f"""
<!-- {city} -->

<div class="gallery-scroll">

"""


    # перебираем фото внутри города
    for photo in os.listdir(city_path):


        # только изображения
        if photo.lower().endswith(
            (".jpg", ".jpeg", ".png", ".webp")
        ):


            # пропускаем фотографии для стопки
            if "stack" in photo:
                continue


            image_path = f"img/travel/{city}/{photo}"


            html += f"""
<img src="{image_path}">
"""


    html += """

</div>

"""


# записываем файл
with open(output, "w", encoding="utf-8") as file:
    file.write(html)


print("Готово! Создан файл gallery.html")