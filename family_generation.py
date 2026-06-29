import os
import json


# где лежат фото семьи
folder = "img_web/family"

# куда сохранить данные
output = "family.json"

family = {}

for year in sorted(os.listdir(folder)):

    year_path = os.path.join(folder, year)

    # пропускаем файлы
    if not os.path.isdir(year_path):
        continue

    photos = []

    for photo in os.listdir(year_path):

        if photo.lower().endswith(
            (".jpg", ".jpeg", ".png", ".webp")
        ):

            photos.append(
                f"img_web/family/{year}/{photo}"
            )

    family[year] = {

        "title": year,
        "text":
        "Ещё один год нашей истории ❤️",
        "photos": photos

    }
with open(output, "w", encoding="utf-8") as file:

    json.dump(
        family,
        file,
        indent=4,
        ensure_ascii=False
    )
print("Готово! Создан family.json")