from PIL import Image, ImageOps
from pillow_heif import register_heif_opener
import os

# включаем поддержку HEIC/HEIF
register_heif_opener()


source_folder = "img_web/family"

output_folder = "img_web/family_web"


# какие форматы обрабатываем
allowed = (
    ".jpg",
    ".jpeg",
    ".png",
    ".heic",
    ".heif"
)


for root, dirs, files in os.walk(source_folder):

    for file in files:


        # пропускаем видео (Live Photo)
        if file.lower().endswith(
            (".mp4", ".mov")
        ):
            print("Пропуск видео:", file)
            continue



        if not file.lower().endswith(allowed):
            continue



        input_path = os.path.join(root, file)



        # сохраняем такую же структуру папок
        relative = os.path.relpath(
            root,
            source_folder
        )


        save_folder = os.path.join(
            output_folder,
            relative
        )


        os.makedirs(
            save_folder,
            exist_ok=True
        )



        filename = os.path.splitext(file)[0]

        output_path = os.path.join(
            save_folder,
            filename + ".webp"
        )



        try:


            img = Image.open(input_path)



            # исправляет поворот с айфона
            img = ImageOps.exif_transpose(img)



            img.save(
                output_path,
                "WEBP",
                quality=85
            )


            print(
                "Готово:",
                output_path
            )


        except Exception as e:


            print(
                "Ошибка:",
                file,
                e
            )


print("Оптимизация завершена")